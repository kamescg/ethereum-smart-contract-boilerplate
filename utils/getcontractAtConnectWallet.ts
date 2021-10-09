import { Contract, Wallet } from "ethers"

export async function getcontractAtConnectWallet(ethers: any, contract: string, address: string, wallet: Wallet): Promise<Contract> { return await (await ethers.getContractAt(contract, address)).connect(wallet) }
export default getcontractAtConnectWallet;