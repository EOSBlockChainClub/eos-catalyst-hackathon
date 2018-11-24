# eos-catalyst-workshop
EOS DApp developed during EOS Catalyst hackathon

## Quick start

### Building smart contract

* Create the user for contract

    ```
    cleos create account eosio poo EOS5nEm1mbr79A1vrfuUXydPcPyu8cZYDsRNJSHNfHt5aMUB8PnvT -p eosio@active
    ```
    [Replace the public key] 
   

* Compile the contract

    ```
    eosio-cpp -o poo.wasm poo.cpp --abigen```
    
* Deploy the contract

    ```
    cleos set contract poo [contract_path] -p poo@active```
    
* Intract with contract

    ```
        cleos push action poo addrecord '[1231, "alice"]' -p alice@active
    
        cleos push action poo updaterecord '[1231, "alice"]' -p alice@active
    ```
 
### Starting client

   ```
    cd client
    
    npm install
    
    npm start
   ``` 