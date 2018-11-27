import { Api, JsonRpc, SignatureProvider} from 'eosjs';
import Eos from 'eosjs';
import {config} from "../config";

// Main action call to blockchain
async function takeAction(action, dataValue) {
  // const privateKey = localStorage.getItem("cardgame_key");

  const privateKey = '5Kkg3rfn5oa4LDJ9myWQiffrC7Agv22uFwmguHrfVUsqJyrPqvH';
  const rpc = new JsonRpc(config.REACT_APP_EOS_HTTP_ENDPOINT, { fetch });
  const signatureProvider = new SignatureProvider([privateKey]);
  const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

  // Main call to blockchain after setting action, account_name and data
  try {
    const resultWithConfig = await api.transact({
      actions: [{
        account: config.REACT_APP_EOS_CONTRACT_NAME,
        name: action,
        authorization: [{
          actor: 'alice',
          permission: 'active',
        }],
        data: dataValue,
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
    return resultWithConfig;
  } catch (err) {
    throw(err)
  }
}

class ApiService {
    static getEosInstance(){

        console.log("cunt");

    const eos = Eos({
        keyProvider: [
            '5KekiN6Ao1T2QwHoeKLn7wS4PfcWZo9RG9gDoUusm7L9Txx6c5C'
        ],
        httpEndpoint: config.REACT_APP_EOS_HTTP_ENDPOINT
    });

    return eos;
    }


  static getBalance() {

      const eos = ApiService.getEosInstance();

      eos.getCurrencyBalance("eosio.token", 'bob').then(tokenBalance =>     {
          console.log(tokenBalance)
  });
  }


    static registerAsset(file_id, user) {

      const eos = ApiService.getEosInstance();

      eos.transaction({
              actions: [
                  {
                      account: "poo",
                      name: "addrecord",
                      authorization: [
                          {
                              actor: user,
                              permission: "active"
                          }
                      ],
                      data: {"file_id": file_id, "user": user}
                  }
              ]
          })
          .then(result => {
              // Check token balances again.  You'll now see 5 TOK in user2’s
              // account and 95 TOK in user1’s account
              console.log(result);
          });

  }

    static getAssetOwnership(file_id, from, to, quantity, callback) {

        const eos = ApiService.getEosInstance();

        try {

            eos.transaction({
                actions: [
                    {
                        account: "poo",
                        name: "transrecord",
                        authorization: [
                            {
                                actor: from,
                                permission: "active"
                            }
                        ],
                        data: {"file_id": file_id, "from": from, "to": to, "quantity": quantity}
                    }
                ]
            })
                .then(result => {
                    // Check token balances again.  You'll now see 5 TOK in user2’s
                    // account and 95 TOK in user1’s account
                    console.log(result);
                });

        }

        catch (err) {
            console.log(err);
        }
    }

    static queryAsset(file_id, callback) {

        const eos = ApiService.getEosInstance();

        try {

            eos.getTableRows({
                code:'poo',
                scope:'poo',
                table:'files',
                lower_bound: file_id,
                upper_bound: file_id+1,
                json: true,
            }).then(function(res) {
                try {
                    callback('fileOwner', res.rows[0].user);
                }
                catch (err) {
                    console.log(err);
                    callback('fileOwner', false);

                }
            });

        }

        catch (err) {
            console.log(err);
        }
    }

}

export default ApiService;
