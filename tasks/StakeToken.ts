import { ethers } from "ethers"
import { getUserAndWallet } from '../utils/getUserAndWallet';
import { getcontractAtConnectWallet } from '../utils/getcontractAtConnectWallet';
import { getContractConnectWallet } from '../utils/getContractConnectWallet';
const toWei = ethers.utils.parseEther

interface state {
   ethers: any
}

/**
 * @name ERC20.deposit()
 */
// @ts-ignore
task("deposit", "Deposit Token and Mint Shares")
   .addParam("amount", "<uint256>")
   .addOptionalParam("user", "<address>")
   .addOptionalParam("wallet", "<address>")
   .setAction(async (args: any, { ethers }: state) => {
      const { wallet } = await getUserAndWallet(ethers, args)
      const stakeToken = await getContractConnectWallet(ethers, 'StakeToken', wallet)
      console.log('Starting Deposit')
      await stakeToken.deposit(toWei(args.amount))
      console.log('Deposit Complete')
   });

/**
 * @name ERC20.withdraw()
 */
// @ts-ignore
task("withdraw", "Burn Shares and Receive Tokens")
   .addParam("amount", "<uint256>")
   .addOptionalParam("user", "<address>")
   .addOptionalParam("wallet", "<address>")
   .setAction(async (args: any, { ethers }: state) => {
      const { wallet } = await getUserAndWallet(ethers, args)
      const stakeToken = await getContractConnectWallet(ethers, 'StakeToken', wallet)
      console.log('Starting Deposit')
      await stakeToken.withdraw(toWei(args.amount))
      console.log('Deposit C`omplete')
   });