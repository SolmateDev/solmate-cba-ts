export type SolmateCba = {
  "version": "0.1.0",
  "name": "solmate_cba",
  "instructions": [
    {
      "name": "create",
      "accounts": [
        {
          "name": "controller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "crankAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": null
    },
    {
      "name": "close",
      "accounts": [
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pcVault",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": null
    },
    {
      "name": "addValidator",
      "accounts": [
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "validatorPipeline",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "periods",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "validator",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "crankFeeRateNum",
          "type": "u64"
        },
        {
          "name": "crankFeeRateDen",
          "type": "u64"
        },
        {
          "name": "address",
          "type": {
            "defined": "ProxyAddress"
          }
        }
      ],
      "returns": null
    },
    {
      "name": "updateValidator",
      "accounts": [
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "validatorPipeline",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "newAdmin",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "crankFeeRateNum",
          "type": "u64"
        },
        {
          "name": "crankFeeRateDen",
          "type": "u64"
        },
        {
          "name": "address",
          "type": {
            "defined": "ProxyAddress"
          }
        }
      ],
      "returns": null
    },
    {
      "name": "appendPeriod",
      "accounts": [
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "validatorPipeline",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "periods",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "withhold",
          "type": "u64"
        },
        {
          "name": "start",
          "type": "u64"
        },
        {
          "name": "length",
          "type": "u64"
        },
        {
          "name": "decayRateNum",
          "type": "u64"
        },
        {
          "name": "decayRateDen",
          "type": "u64"
        }
      ],
      "returns": null
    },
    {
      "name": "insertBid",
      "accounts": [
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "validatorPipeline",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "periods",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userFund",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bid",
          "type": {
            "defined": "Bid"
          }
        }
      ],
      "returns": null
    },
    {
      "name": "crank",
      "accounts": [
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pcVault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "validatorPipeline",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "periods",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "crankerFund",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cranker",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": null
    }
  ],
  "accounts": [
    {
      "name": "bidList",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pipeline",
            "type": "publicKey"
          },
          {
            "name": "book",
            "type": {
              "vec": {
                "defined": "Bid"
              }
            }
          },
          {
            "name": "lastPeriodStart",
            "type": "u64"
          },
          {
            "name": "crankFeeRate",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          },
          {
            "name": "bandwidthDenominator",
            "type": "u64"
          },
          {
            "name": "totalDeposits",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "controller",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controllerBump",
            "type": "u8"
          },
          {
            "name": "pcVaultBump",
            "type": "u8"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "crankAuthority",
            "type": "publicKey"
          },
          {
            "name": "pcVault",
            "type": "publicKey"
          },
          {
            "name": "pcMint",
            "type": "publicKey"
          },
          {
            "name": "pcVaultAllocatedAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "periodRing",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pipeline",
            "type": "publicKey"
          },
          {
            "name": "ring",
            "type": {
              "vec": {
                "defined": "Period"
              }
            }
          },
          {
            "name": "start",
            "type": "u16"
          },
          {
            "name": "length",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "pipeline",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controller",
            "type": "publicKey"
          },
          {
            "name": "validator",
            "type": "publicKey"
          },
          {
            "name": "pipelineBump",
            "type": "u8"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "crankFeeRate",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          },
          {
            "name": "address",
            "type": {
              "defined": "ProxyAddress"
            }
          },
          {
            "name": "periods",
            "type": "publicKey"
          },
          {
            "name": "bids",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "BidAuth",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "start",
            "type": "i64"
          },
          {
            "name": "nonce",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Bid",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isBlank",
            "type": "bool"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "refund",
            "type": "publicKey"
          },
          {
            "name": "deposit",
            "type": "u64"
          },
          {
            "name": "bandwidthAllocation",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Period",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isBlank",
            "type": "bool"
          },
          {
            "name": "withhold",
            "type": "u64"
          },
          {
            "name": "start",
            "type": "u64"
          },
          {
            "name": "length",
            "type": "u64"
          },
          {
            "name": "decayRate",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ProxyAddress",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "url",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "PeriodStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "HasFinished"
          },
          {
            "name": "InProgress"
          },
          {
            "name": "WillStart"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unknown",
      "msg": "unknown error"
    },
    {
      "code": 6001,
      "name": "UserMismatch",
      "msg": "user does not match"
    },
    {
      "code": 6002,
      "name": "ZeroBid",
      "msg": "user is not allowed to submit 0 bid"
    },
    {
      "code": 6003,
      "name": "PeriodRingBufferSizeExceeded",
      "msg": "there are too many periods that have been inserted into the buffer"
    },
    {
      "code": 6004,
      "name": "PeriodRingBufferIsEmpty",
      "msg": "no periods"
    },
    {
      "code": 6005,
      "name": "PeriodIsPremature",
      "msg": "period is premature"
    },
    {
      "code": 6006,
      "name": "PeriodStartDoesNotMatchTail",
      "msg": "period has expired"
    },
    {
      "code": 6007,
      "name": "PeriodHasExpired",
      "msg": "the new period start does not match the ending of the tail period"
    },
    {
      "code": 6008,
      "name": "PeriodLengthIsTooLong",
      "msg": "period length exceeds maximum allowed"
    },
    {
      "code": 6009,
      "name": "PeriodLengthIsTooShort",
      "msg": "period length is less than minimum allowed"
    },
    {
      "code": 6010,
      "name": "PeriodWithholdIsTooLarge",
      "msg": "period withhold is greater than maximum allowed"
    },
    {
      "code": 6011,
      "name": "PeriodBufferEndedPrematurely",
      "msg": "period buffer has ended prematurely"
    },
    {
      "code": 6012,
      "name": "PeriodNoneInProgresss",
      "msg": "no period in progress"
    },
    {
      "code": 6013,
      "name": "PeriodHasAlreadyBeenCranked",
      "msg": "period has already been cranked"
    }
  ]
};

export const IDL: SolmateCba = {
  "version": "0.1.0",
  "name": "solmate_cba",
  "instructions": [
    {
      "name": "create",
      "accounts": [
        {
          "name": "controller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "crankAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": null
    },
    {
      "name": "close",
      "accounts": [
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pcVault",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": null
    },
    {
      "name": "addValidator",
      "accounts": [
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "validatorPipeline",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "periods",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "validator",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "crankFeeRateNum",
          "type": "u64"
        },
        {
          "name": "crankFeeRateDen",
          "type": "u64"
        },
        {
          "name": "address",
          "type": {
            "defined": "ProxyAddress"
          }
        }
      ],
      "returns": null
    },
    {
      "name": "updateValidator",
      "accounts": [
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "validatorPipeline",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "newAdmin",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "crankFeeRateNum",
          "type": "u64"
        },
        {
          "name": "crankFeeRateDen",
          "type": "u64"
        },
        {
          "name": "address",
          "type": {
            "defined": "ProxyAddress"
          }
        }
      ],
      "returns": null
    },
    {
      "name": "appendPeriod",
      "accounts": [
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "validatorPipeline",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "periods",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "withhold",
          "type": "u64"
        },
        {
          "name": "start",
          "type": "u64"
        },
        {
          "name": "length",
          "type": "u64"
        },
        {
          "name": "decayRateNum",
          "type": "u64"
        },
        {
          "name": "decayRateDen",
          "type": "u64"
        }
      ],
      "returns": null
    },
    {
      "name": "insertBid",
      "accounts": [
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "validatorPipeline",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "periods",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userFund",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bid",
          "type": {
            "defined": "Bid"
          }
        }
      ],
      "returns": null
    },
    {
      "name": "crank",
      "accounts": [
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pcVault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "validatorPipeline",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "periods",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bids",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "crankerFund",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cranker",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": null
    }
  ],
  "accounts": [
    {
      "name": "bidList",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pipeline",
            "type": "publicKey"
          },
          {
            "name": "book",
            "type": {
              "vec": {
                "defined": "Bid"
              }
            }
          },
          {
            "name": "lastPeriodStart",
            "type": "u64"
          },
          {
            "name": "crankFeeRate",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          },
          {
            "name": "bandwidthDenominator",
            "type": "u64"
          },
          {
            "name": "totalDeposits",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "controller",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controllerBump",
            "type": "u8"
          },
          {
            "name": "pcVaultBump",
            "type": "u8"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "crankAuthority",
            "type": "publicKey"
          },
          {
            "name": "pcVault",
            "type": "publicKey"
          },
          {
            "name": "pcMint",
            "type": "publicKey"
          },
          {
            "name": "pcVaultAllocatedAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "periodRing",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pipeline",
            "type": "publicKey"
          },
          {
            "name": "ring",
            "type": {
              "vec": {
                "defined": "Period"
              }
            }
          },
          {
            "name": "start",
            "type": "u16"
          },
          {
            "name": "length",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "pipeline",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "controller",
            "type": "publicKey"
          },
          {
            "name": "validator",
            "type": "publicKey"
          },
          {
            "name": "pipelineBump",
            "type": "u8"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "crankFeeRate",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          },
          {
            "name": "address",
            "type": {
              "defined": "ProxyAddress"
            }
          },
          {
            "name": "periods",
            "type": "publicKey"
          },
          {
            "name": "bids",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "BidAuth",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "start",
            "type": "i64"
          },
          {
            "name": "nonce",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Bid",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isBlank",
            "type": "bool"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "refund",
            "type": "publicKey"
          },
          {
            "name": "deposit",
            "type": "u64"
          },
          {
            "name": "bandwidthAllocation",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Period",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isBlank",
            "type": "bool"
          },
          {
            "name": "withhold",
            "type": "u64"
          },
          {
            "name": "start",
            "type": "u64"
          },
          {
            "name": "length",
            "type": "u64"
          },
          {
            "name": "decayRate",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          }
        ]
      }
    },
    {
      "name": "ProxyAddress",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "url",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "PeriodStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "HasFinished"
          },
          {
            "name": "InProgress"
          },
          {
            "name": "WillStart"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unknown",
      "msg": "unknown error"
    },
    {
      "code": 6001,
      "name": "UserMismatch",
      "msg": "user does not match"
    },
    {
      "code": 6002,
      "name": "ZeroBid",
      "msg": "user is not allowed to submit 0 bid"
    },
    {
      "code": 6003,
      "name": "PeriodRingBufferSizeExceeded",
      "msg": "there are too many periods that have been inserted into the buffer"
    },
    {
      "code": 6004,
      "name": "PeriodRingBufferIsEmpty",
      "msg": "no periods"
    },
    {
      "code": 6005,
      "name": "PeriodIsPremature",
      "msg": "period is premature"
    },
    {
      "code": 6006,
      "name": "PeriodStartDoesNotMatchTail",
      "msg": "period has expired"
    },
    {
      "code": 6007,
      "name": "PeriodHasExpired",
      "msg": "the new period start does not match the ending of the tail period"
    },
    {
      "code": 6008,
      "name": "PeriodLengthIsTooLong",
      "msg": "period length exceeds maximum allowed"
    },
    {
      "code": 6009,
      "name": "PeriodLengthIsTooShort",
      "msg": "period length is less than minimum allowed"
    },
    {
      "code": 6010,
      "name": "PeriodWithholdIsTooLarge",
      "msg": "period withhold is greater than maximum allowed"
    },
    {
      "code": 6011,
      "name": "PeriodBufferEndedPrematurely",
      "msg": "period buffer has ended prematurely"
    },
    {
      "code": 6012,
      "name": "PeriodNoneInProgresss",
      "msg": "no period in progress"
    },
    {
      "code": 6013,
      "name": "PeriodHasAlreadyBeenCranked",
      "msg": "period has already been cranked"
    }
  ]
};
