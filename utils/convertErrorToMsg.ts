import { Contract } from "ethers";
import { red, green, cyan } from './colors';

async function convertErrorToMsg(EthersErrorInterface: any, contract: Contract) {
  if (EthersErrorInterface.error) {
    console.log(red('-------------------------------------------------------------------------'))
    console.log(green(`To: ${contract.address}`))
    console.log(cyan(`From: ${await contract.signer.getAddress()}\n`))
    console.log(red(EthersErrorInterface.error))
    console.log(red('-------------------------------------------------------------------------'))
  }
}

module.exports = {
  convertErrorToMsg
}