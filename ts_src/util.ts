import * as anchor from '@project-serum/anchor';
import * as splToken from "@solana/spl-token";


export function Clock(): anchor.web3.PublicKey{
    return anchor.web3.SYSVAR_CLOCK_PUBKEY;
}

export function TokenProgram(): anchor.web3.PublicKey{
    return splToken.TOKEN_PROGRAM_ID;
}

export function SystemProgram(): anchor.web3.PublicKey{
    return anchor.web3.SystemProgram.programId;
}

export function Rent(): anchor.web3.PublicKey{
    return anchor.web3.SYSVAR_RENT_PUBKEY;
}


export function sleep(time: number): Promise<void>{
    return new Promise((resolve)=>{
        setTimeout(resolve,time);
    });
}

export function onSig(connection: anchor.web3.Connection, sig: string): Promise<number>{
    return new Promise((resolve,reject)=>{
      try{
        connection.onSignatureWithOptions(sig,(x,context)=>{
          if(x.type=="status") resolve(context.slot);
        },{commitment:"finalized",enableReceivedNotification:false});
      }
      catch(e){
        reject(e);
      }
    })
}
  
/**
 * create the token account address given a mint address and owner address
 * @param mint 
 * @param owner 
 * @returns 
 */
export async function getTokenAccount(
    mint: anchor.web3.PublicKey,
    owner: anchor.web3.PublicKey,
): Promise<anchor.web3.PublicKey>{
    return await splToken.getAssociatedTokenAddress(mint,owner,true,splToken.TOKEN_PROGRAM_ID,splToken.ASSOCIATED_TOKEN_PROGRAM_ID);
}
  
/**
 * create and initialize a token account given a mint address and owner address.
 * @param connection 
 * @param feePayer 
 * @param mint 
 * @param owner 
 * @returns 
 */
export async function createTokenAccount(
    connection: anchor.web3.Connection,
    feePayer: anchor.web3.Keypair,
    mint: anchor.web3.PublicKey,
    owner: anchor.web3.PublicKey,
): Promise<splToken.Account>{
    const token_address = await splToken.getAssociatedTokenAddress(mint,owner,true,splToken.TOKEN_PROGRAM_ID,splToken.ASSOCIATED_TOKEN_PROGRAM_ID);
    await splToken.createAccount(connection,feePayer,mint,owner,undefined,{"commitment":"finalized"},splToken.TOKEN_PROGRAM_ID);
    const account = await splToken.getAccount(connection,token_address,"finalized",splToken.TOKEN_PROGRAM_ID);
    return account;
}
  
export async function getTokenAddress(
    mint: anchor.web3.PublicKey,
    owner: anchor.web3.PublicKey,
): Promise<anchor.web3.PublicKey>{
    return await splToken.getAssociatedTokenAddress(mint,owner,true,splToken.TOKEN_PROGRAM_ID,splToken.ASSOCIATED_TOKEN_PROGRAM_ID);
}

/**
 * convert string name of website to 32B fixed length buffer
 * @param name 
 * @returns 
 */
export function convertStringToFixedLengthBuffer(name: string): Buffer{
    const nameBuf=Buffer.from(name,"utf8");
    if(31 < nameBuf.length) throw new Error("string is too long");
    const l = Buffer.alloc(1);
    l.writeUInt8(nameBuf.length);
    const leftOver = Buffer.alloc(32 - 1 - nameBuf.length,0);
    return Buffer.concat([l,nameBuf,leftOver]);
}
  
/**
 * convert a buffer to number array for use in creating Solana instructions.
 * @param buf 
 * @returns 
 */
export function convert(buf: Buffer): number[]{
    const ans:number[]=[];
    for(let i=0;i<buf.length;i++){
        ans.push(buf[i]);
    }
    return ans;
}
  
export function convertToBuffer(data: number[]): Buffer{
    const ans=Buffer.alloc(data.length);
    for(let i=0;i<data.length;i++){
        ans[i]=data[i];
    }

    return ans;
}
  

  


export function DecayDeposit(deposit: anchor.BN,rate: anchor.BN[]){
    const x = deposit;
    const y = rate[0];
    const z = rate[1];
    const p = x.mul(y);
    const r = p.mod(z);
    
    return p.sub(r).div(z);
}

/* rust function

pub(crate) fn decay_deposit(deposit: u64, decay_rate: [u64;2])->Result<u64>{
    check_rate(decay_rate)?;

    let x = deposit as u128;
    let y = decay_rate[0] as u128;
    let z = decay_rate[1] as u128;

    let p = x * y;
    let r = p % z;

    Ok(((p - r) / z ) as u64)
}
*/