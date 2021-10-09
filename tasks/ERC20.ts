import { ethers } from "ethers"
import { getUserAndWallet } from '../utils/getUserAndWallet';
import { getcontractAtConnectWallet } from '../utils/getcontractAtConnectWallet';
const toWei = ethers.utils.parseEther

interface state {
   ethers: any
}

/**
 * @name ERC20.balanceOf()
 */
// @ts-ignore
task("balanceOf", "Balance of User")
   .addParam("token", "<address>")
   .addOptionalParam("user", "<address>")
   .addOptionalParam("wallet", "<address>")
   .setAction(async (args: any, { ethers }: state) => {
      const { user, wallet } = await getUserAndWallet(ethers, args)
      const erc20 = await getcontractAtConnectWallet(ethers, 'ERC20Mintable', args.token, wallet)
      console.log('Balance:', ethers.utils.formatEther(await erc20.balanceOf(user)))
   });

/**
 * @name ERC20.mint()
 */
// @ts-ignore
task("mint", "Mint Tokens")
   .addParam("token", "<address>")
   .addParam("to", "<address>",)
   .addParam("amount", "<uint256>",)
   .addOptionalParam("user", "<address>")
   .addOptionalParam("wallet", "<address>")
   .setAction(async (args: any, { ethers }: state) => {
      const { wallet } = await getUserAndWallet(ethers, args)
      const erc20 = await getcontractAtConnectWallet(ethers, 'ERC20Mintable', args.token, wallet)
      console.log('Mint Starting');
      await erc20.mint(args.to, toWei(args.amount))
      console.log('Mint Complete');
   });

/**
 * @name ERC20.burn()
 */
// @ts-ignore
task("burn", "Burn Tokens")
   .addParam("token", "<address>")
   .addParam("from", "<address>",)
   .addParam("amount", "<uint256>",)
   .addOptionalParam("user", "<address>")
   .addOptionalParam("wallet", "<address>")
   .setAction(async (args: any, { ethers }: state) => {
      const { wallet } = await getUserAndWallet(ethers, args)
      const erc20 = await getcontractAtConnectWallet(ethers, 'ERC20Mintable', args.token, wallet)
      console.log('Burn Starting');
      await erc20.mint(args.from, toWei(args.amount))
      console.log('Burn Complete');
   });


/**
 * @name ERC20.approve()
 */
// @ts-ignore
task("approve", "Approve Token Spending")
   .addParam("token", "<address>")
   .addParam("spender", "<address>",)
   .addParam("amount", "<uint256>",)
   .addOptionalParam("user", "<address>")
   .addOptionalParam("wallet", "<address>")
   .setAction(async (args: any, { ethers }: state) => {
      const { wallet } = await getUserAndWallet(ethers, args)
      const erc20 = await getcontractAtConnectWallet(ethers, 'ERC20Mintable', args.token, wallet)
      console.log('Approve Starting');
      await erc20.approve(args.spender, toWei(args.amount))
      console.log('Approve Complete');
   });


