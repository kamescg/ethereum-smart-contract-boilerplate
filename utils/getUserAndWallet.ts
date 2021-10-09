import { Wallet } from "ethers";
import { Address } from "hardhat-deploy/dist/types"

interface UserAndWallet {
  user: Address
  wallet: Wallet,
}

export const getUserAndWallet = async (ethers: any, args: { user: string, wallet: number }): Promise<UserAndWallet> => {
  const wallet = (await ethers.getSigners())[args.wallet || 0]
  return {
    wallet,
    user: args && args.user || wallet && wallet.address
  }
}

export default getUserAndWallet;