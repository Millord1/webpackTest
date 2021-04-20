
import {
    web3Accounts,
    web3AccountsSubscribe,
    web3Enable,
    web3FromAddress, web3FromSource,
    web3ListRpcProviders,
    web3UseRpcProvider
} from '@polkadot/extension-dapp';

// import {ApiPromise, WsProvider} from '@polkadot/api';

import {stringToHex} from '@polkadot/util';

window.Buffer = window.Buffer || require('buffer').Buffer;


// this call fires up the authorization popup
const extensions = await web3Enable('Kusama Gallery');

if (extensions.length === 0) {
    // no extension installed, or the user did not accept the authorization
    // in this case we should inform the use and give a link to the extension
    alert("You need to have Polkadot js extension for access to this page");
}

const accounts = await web3Accounts();

let myAccount;

if(accounts.length === 0){

    await web3AccountsSubscribe((injected)=>{
        injected.map((account)=>{
            console.log(account.address);
            myAccount = account;
        })
    })

}else{
    // Default choice, the first account
    myAccount = accounts[0];
}


const weSender = '5H9QiegjVPVXjZtEKEyJ9HG9KkwPdr2adQCUGbH2WGsrxCeW';

const weReceiver = '5DxxAsbeBHwjTTXf2upT2dFLjxdZTMhQwJrgEFPbjf6hJi89';


const address = myAccount.address;

// const injector = await web3FromSource(myAccount.meta.source);
// console.log(myAccount.address);

const injector = await web3FromAddress(weSender);

// sign a tx

const signRaw = injector?.signer?.signRaw;

if(!!signRaw){
    const {signature} = await signRaw({
        address,
        data: stringToHex('I want to sign'),
        type: 'bytes'
    });
}


// send something

// const targetAddr = '5C5555yEXUcmEJ5kkcCMvdZjUo7NGJiQJMS7vZXEeoMhj3VQ';
// const value = 12345;

// ApiPromise.create({provider: new WsProvider('wss://westend-rpc.polkadot.io/')}).then((api)=>{
//     api.tx.balances.transfer(weReceiver, 0.1)
//         .signAndSend(weSender, {signer: injector.signer}, (status)=>{
//             console.log(status);
//     })
// }).catch((e)=>{
//     console.log(e);
// })

// const transferExtrinsic =
//     api.tx.balances.transfer(weReceiver, 0.1)
//     .signAndSend(weSender, {signer: injector.signer}, (status)=>{
//         console.log(status);
// })

// transferExtrinsic.signAndSend(weSender, { signer: injector.signer }, ({ status }) => {
//     if (status.isInBlock) {
//         console.log(`Completed at block hash #${status.asInBlock.toString()}`);
//     } else {
//         console.log(`Current status: ${status.type}`);
//     }
// }).catch((error) => {
//     console.log(':( transaction failed', error);
// });
