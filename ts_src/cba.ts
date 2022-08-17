import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { SolmateCba } from '../target/types/solmate_cba';//
import * as splToken from "@solana/spl-token";
import * as util from "./util";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';




//export const program = new anchor.Program(SolamteCbaBackup,programKeyPair.publicKey)
export const program = anchor.workspace.SolmateCba as Program<SolmateCba>;

const PROGRAM_ID = program.programId;
const connection = program.provider.connection;

export async function ControllerId(){
    const [id, bump] = await anchor.web3.PublicKey.findProgramAddress([
        Buffer.from('controller'),
      ], PROGRAM_ID);
    // console.log(`controller=${id.toBase58()}`);
    return {id,bump};
}

export async function PcVault(){
    const [id, bump] = await anchor.web3.PublicKey.findProgramAddress([
        Buffer.from('pc_vault'),
      ], PROGRAM_ID);
    // console.log(`pc_vault=${id.toBase58()}`);
    return {id,bump};
}

export async function CreateController(
    admin: anchor.web3.Signer,
    crank_authority: anchor.web3.Signer,
    pcMint: anchor.web3.PublicKey,
): Promise<anchor.web3.PublicKey>{
    const controller=(await ControllerId()).id;

    const pcVault = (await PcVault()).id;
    const clock = util.Clock();
    const tokenProgram = util.TokenProgram();
    const systemProgram = util.SystemProgram();
    const rent = util.Rent();

    const sig = await program.rpc.create({
        accounts:{
            controller,
            admin: admin.publicKey,
            crankAuthority:crank_authority.publicKey,
            pcMint,
            pcVault,
            clock,
            tokenProgram,
            systemProgram,
            rent,
        },
        signers:[
            admin, crank_authority,
        ]
    });
    await util.onSig(connection,sig);

    return controller;
}

export async function FetchController(){
    return program.account.controller.fetch((await ControllerId()).id,"finalized");
}

export async function ValidatorPipelineId(validator: anchor.web3.PublicKey){
    const controller=(await ControllerId()).id;
    //console.log(`controller 2=${controller.toBase58()}`)
    const [id, bump] = await anchor.web3.PublicKey.findProgramAddress([
        Buffer.from('validator_pipeline'),
        controller.toBuffer(),
        validator.toBuffer(),
      ], PROGRAM_ID);
    // console.log(`validator=${id.toBase58()}`);
    return {id,bump};
}

export async function ValidatorPipeline(validator: anchor.web3.PublicKey){
    const {id} = await ValidatorPipelineId(validator);
    return program.account.pipeline.fetch(id);
}




export interface Bid{
    isBlank: boolean,
    user: anchor.web3.PublicKey,
    refund: anchor.web3.PublicKey,
    deposit: anchor.BN,
    bandwidthAllocation: anchor.BN,
}

export interface BidList{
    id: anchor.web3.PublicKey,
    book: Map<string,Bid>,
    crankFeeRate: anchor.BN[],
    bandwidthDenominator: anchor.BN,
    totalDeposits: anchor.BN,
}

export interface PeriodRing{
    id: anchor.web3.PublicKey,
    ring: Period[],
    start: number,
    length: number,
}

export interface ProxyAddress{
    url: string;
}

interface PipelineData{
    controller: anchor.web3.PublicKey,
    validator: anchor.web3.PublicKey,
    admin: anchor.web3.PublicKey,
    crankFeeRate: anchor.BN[],
    bandwidthDenominator: anchor.BN,
    totalDeposits: anchor.BN,
    proxyAddress: ProxyAddress,
    periods: PeriodRing,
    bids: BidList,
}

export interface Controller{
    admin: anchor.web3.PublicKey,
    crankAuthority: anchor.web3.PublicKey,
    pcVault: anchor.web3.PublicKey,
    pcMint: anchor.web3.PublicKey,
    //nextPeriodStart: anchor.BN,
}

interface RawRingSingle{
    isBlank:boolean,
    withhold: string,
    length: string,
    start: string,
    decayRate: string[]
}

export interface Period{
    isBlank: boolean,
    withhold: anchor.BN,
    start: number,
    length: number,
    decayRate: anchor.BN[]
}

function convertRingSingle(x: RawRingSingle): Period{
    
    
    //console.log(`before period=${x.start};${x.length};${x.withhold}`);
    return {
        isBlank: x.isBlank,
        withhold: new anchor.BN(x.withhold),
        start: Number(x.start),
        length: Number(x.length),
        decayRate:[new anchor.BN(x.decayRate[0]),new anchor.BN(x.decayRate[1])],
    }
}


interface RawBid{
    isBlank: boolean,
    user: string,
    refund: string,
    deposit: string,
    bandwidthAllocation: string,
}

function converstBidSingle(x: RawBid):Bid{
    const user = new anchor.web3.PublicKey(x.user);
    const refund = new anchor.web3.PublicKey(x.refund);
    //console.log(`hex bid=${x.deposit}`);
    //const d = Buffer.from(x.deposit,"hex");
    //const b = Buffer.from(x.bandwidthAllocation,"hex");
    return {
        isBlank: x.isBlank,
        user,refund,
        deposit: new anchor.BN(x.deposit),
        bandwidthAllocation: new anchor.BN(x.bandwidthAllocation)
    }
}


export class Pipeline{
    static load=async (validatorId: anchor.web3.PublicKey)=>{
        const {id} = await ValidatorPipelineId(validatorId);
        const data = await program.account.pipeline.fetch(id);
        
        const dataController = await program.account.controller.fetch(data.controller);

        const dataBids = await program.account.bidList.fetch(data.bids);
        const dataPeriods = await program.account.periodRing.fetch(data.periods);
        
        const ring: Period[] = [];
        // @ts-ignore
        dataPeriods.ring.map((p)=>{
            const q = convertRingSingle(p);
            if(!q.isBlank) ring.push(q);
        });
        
        const book: Map<string,Bid>=new Map();
        // @ts-ignore
        dataBids.book.map((x)=>{
            const y = converstBidSingle(x);
            if(!y.isBlank){
                book.set(y.user.toBase58(),y);
            }
        });
        
        const x = new Pipeline(program,id,{
            controller: data.controller,
            validator: data.validator,
            admin: data.admin,
            crankFeeRate: data.crankFeeRate,
            totalDeposits: data.totalDeposits,
            bandwidthDenominator: data.bandwidthDenominator,
            proxyAddress:{
                url: (data.address.url as Buffer).toString("utf-8"),
            },
            periods: {
                id: data.periods,
                start: dataPeriods.start,
                length: dataPeriods.length,
                ring,
            },
            bids: {
                id: data.bids,
                book,
                crankFeeRate: dataBids.crankFeeRate,
                bandwidthDenominator: dataBids.bandwidthDenominator,
                totalDeposits: dataBids.totalDeposits,
            },
        },{
            admin: dataController.admin,
            crankAuthority: dataController.crankAuthority,
            pcVault: dataController.pcVault,
            pcMint: dataController.pcMint,
            //nextPeriodStart: dataController.nextPeriodStart,
        });
        return x;
    }

    protected id: anchor.web3.PublicKey;
    protected program:Program<SolmateCba>;
    protected _data: PipelineData;
    protected _controller: Controller;

    constructor(program: Program<SolmateCba>, id: anchor.web3.PublicKey, data: PipelineData, controller: Controller){
        this.program=program;
        this.id=id;
        this._data = data;
        this._controller=controller;


    }

    data(){
        return this._data;
    }

    controller_id(){
        return this._data.controller;
    }

    bid_id(){
        return this._data.bids.id;
    }

    period_id(){
        return this._data.periods.id;
    }

    async bid(user: anchor.web3.Signer, userFunds: anchor.web3.PublicKey, amount: anchor.BN){
        await this.program.methods.insertBid({
            user: user.publicKey,
            isBlank: false,
            refund: userFunds,
            deposit: amount,
            bandwidthAllocation: new anchor.BN(0),
        }).accounts({
            controller: this.controller_id(),
            pcVault: this._controller.pcVault,
            validatorPipeline: this.id,
            periods: this.period_id(),
            bids: this.bid_id(),
            userFund: userFunds,
            user: user.publicKey,
            tokenProgram: splToken.TOKEN_PROGRAM_ID,
        }).signers([user]).rpc();
        await this.refresh();
    }

    async period_add(validatorAdmin: anchor.web3.Signer,withhold: anchor.BN, start: anchor.BN, length: anchor.BN, decayRate: anchor.BN[]){
        if(decayRate.length != 2) throw new Error("bad decay rate");
        await this.program.methods.appendPeriod(withhold,start,length,decayRate[0],decayRate[1]).accounts({
            controller: this.controller_id(),
            validatorPipeline: this.id,
            periods: this.period_id(),
            admin: validatorAdmin.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            clock: SYSVAR_CLOCK_PUBKEY,
        }).signers([validatorAdmin]).rpc({skipPreflight: true});
        await this.refresh();
    }

    async waitForNextPeriod(targetSlot: number){
        const conn = this.program.provider.connection;

        return await new Promise<anchor.web3.SlotInfo>((resolve,reject)=>{
            let subId: number;
            try{

                subId = conn.onSlotChange((x)=>{
                    if(targetSlot <= x.slot){
                        conn.removeSlotChangeListener(subId);
                        resolve(x);
                    }
                    else {
                        //console.log(`waiting... on slot ${x.slot}; ${targetSlot - x.slot} slots until target`);
                    }
                });
            }
            catch(e){
                conn.removeSlotChangeListener(subId);
                reject(e);
            }
        });

    }

    async crank(cranker: anchor.web3.Signer,crankerFund: anchor.web3.PublicKey){
        await this.program.methods.crank().accounts({
            controller: this.controller_id(),
            validatorPipeline: this.id,
            pcVault: this._controller.pcVault,
            periods: this.period_id(),
            bids: this.bid_id(),
            cranker: cranker.publicKey,
            crankerFund: crankerFund,
            tokenProgram: TOKEN_PROGRAM_ID,
            clock: SYSVAR_CLOCK_PUBKEY,
        }).signers([cranker]).rpc({skipPreflight: true});
        
        await this.refresh();
    }


    async refresh(){


        const pipelineId=this.id;
        
        const fn=[];
        
        fn.push(async ()=>{
            const data = await program.account.pipeline.fetch(pipelineId);
            this._data.proxyAddress={
                url: (data.address.url as Buffer).toString("utf-8"),
            };
        });

        fn.push(async ()=>{
            const dataController = await this.program.account.controller.fetch(this.controller_id());
            this._controller={
                admin: dataController.admin,
                crankAuthority: dataController.crankAuthority,
                pcVault: dataController.pcVault,
                pcMint: dataController.pcMint,
                //nextPeriodStart: dataController.nextPeriodStart,
            };
        });


        fn.push(async ()=>{
            const dataBids = await this.program.account.bidList.fetch(this.bid_id());
            
            // @ts-ignore
            const book: Map<string,Bid>=new Map();
            // @ts-ignore
            dataBids.book.map((x)=>{
                const y = converstBidSingle(x);
                //console.log(`bid=${y.isBlank};${y.user.toBase58()};${y.refund.toBase58()}`)
                if(!y.isBlank){
                    if(book.get(y.user.toBase58()) !== undefined) throw new Error("duplicate bid");
                    book.set(y.user.toBase58(),y);
                }
            });
            this._data.bids={
                id: this.bid_id(),
                book,
                crankFeeRate: dataBids.crankFeeRate,
                bandwidthDenominator: dataBids.bandwidthDenominator,
                totalDeposits: dataBids.totalDeposits,
            };
            //this._data.bids.book.forEach((v)=>{
            //    console.log(`user=${v.user.toBase58()}; deposit=${v.deposit.toString()}`)
            //})
        });

        fn.push(async ()=>{
            const dataPeriods = await program.account.periodRing.fetch(this.period_id());
            
            
            const ring: Period[]=[];
            
            // @ts-ignore
            dataPeriods.ring.map((p)=>{
                const q = convertRingSingle(p);
                if(!q.isBlank) ring.push(q);
            });

            this._data.periods={
                id: this.period_id(),
                start: dataPeriods.start,
                length: dataPeriods.length,
                ring,
            };
            //this._data.periods.ring.map((r)=>{
            //    console.log(`period=${r.start};${r.length};${r.isBlank}`);
            //});
        })
        
        await Promise.all(fn.map(f=>f()));



    }

    private async crankStart(cranker: anchor.web3.Signer){
        //this.program.rpc.startCrank();
    }

    private async crankFinish(cranker: anchor.web3.Signer){
        
    }
}

//export const PIPELINE_ACCOUNT_SIZE=Math.floor(1555437*1.1);
export const PERIOD_RING_SIZE=3284;
export const BID_LIST_SIZE=Math.floor(1552000*1.1);

export async function AddValidator(
    validator: anchor.web3.Signer,
    admin: anchor.web3.Signer,
    crank_fee_rate: anchor.BN[],
    grpcConnection: GrpcConnection,
){
    const controllerId=(await ControllerId()).id;
    const controller = await FetchController();
    const validatorPipelineIdBump = await ValidatorPipelineId(validator.publicKey);
    const validatorId = validatorPipelineIdBump.id;
    const validatorBump = validatorPipelineIdBump.bump;
    const clock = util.Clock();
    const systemProgram = util.SystemProgram();
    const rent = util.Rent();

    const bidKP=anchor.web3.Keypair.generate();
    const periodKP=anchor.web3.Keypair.generate();

    const r = await connection.getLatestBlockhash();
    const tx = new anchor.web3.Transaction({"blockhash": r.blockhash, "lastValidBlockHeight": r.lastValidBlockHeight,"feePayer": admin.publicKey});
    
    {
        const size = 1600000;
        tx.add(anchor.web3.SystemProgram.createAccount({
            fromPubkey: admin.publicKey,
            newAccountPubkey: bidKP.publicKey,
            space: size,
            lamports: await connection.getMinimumBalanceForRentExemption(size,"processed"),
            programId: PROGRAM_ID,
        }));
    }
    {
        const size = 5000;
        tx.add(anchor.web3.SystemProgram.createAccount({
            fromPubkey: admin.publicKey,
            newAccountPubkey: periodKP.publicKey,
            space: size,
            lamports: await connection.getMinimumBalanceForRentExemption(size,"processed"),
            programId: PROGRAM_ID,
        }));
    }
    {
        //console.log(`t - 1`)
        const sig = await connection.sendTransaction(tx,[admin,bidKP,periodKP]);
        //console.log(`t - 2`)
        await util.onSig(connection,sig);
        //console.log(`t - 3`)
    }
    
    {
        const signerList=[validator,admin];
        //signerList.map((s)=>{
            //console.log(`key=${s.publicKey.toBase58()}`);
        //})
        const sig = await program.methods.addValidator(crank_fee_rate[0],crank_fee_rate[1],{
            url:Buffer.from(`${grpcConnection.ssl ? "ssl://":""}${grpcConnection.host}:${grpcConnection.port}`,"utf-8")
        }).accounts({
            controller:controllerId,
            validatorPipeline: validatorId,
            pcMint: controller.pcMint,
            validator: validator.publicKey,
            admin: admin.publicKey,
            bids:bidKP.publicKey,
            periods:periodKP.publicKey,
            systemProgram,
            rent,
        }).signers(signerList).rpc();

        
        await util.onSig(connection,sig);
    }
    

}

export interface GrpcConnection{
    host: string;
    port: number;
    ssl: boolean;
}

export function BufferToGrpcUrl(data: Buffer): GrpcConnection{
    if(data.length !== 128) throw new Error("wrong size");
    let k=0;
    const hostLength = data.readUint8(k);
    k+=1;
    const hostBuf=Buffer.alloc(hostLength);
    for(let i=0;i<hostBuf.length;i++){
        hostBuf[i]=data[i+k];
    }
    const host = hostBuf.toString("utf-8");
    k+=hostBuf.length;
    const port = data.readUint16BE(k);
    k+=2;
    const sslNum=data.readUint8(k);
    k+=2;
    const ssl = 0 < sslNum;

    return {
        host,port,ssl
    }
}

/**
 * format: [1;host.length][host][2;port][1;ssl]
 * @param info 
 * @returns 
 */
export function GrpcUrlToBuffer(info: GrpcConnection): Buffer{
    const host = info.host;
    const port = info.port;
    const ssl = info.ssl;
    const ans=Buffer.alloc(128);
    let k=0;
    for(let i=0;i<ans.length;i++){
        ans[i]=0;
    }
    const hostBuf=Buffer.from(host,"utf-8");
    ans.writeUint8(hostBuf.length,k);
    k+=2;
    for(let i=0;i<hostBuf.length;i++){
        ans[i+k]=hostBuf[k];
    }
    k+=hostBuf.length;
    ans.writeUint16BE(port,k);
    k+=2;
    if(ssl){
        ans.writeUInt8(1,k);
    }
    else{
        ans.writeUInt8(0,k);
    }
    k+=1;
    return ans;
}
