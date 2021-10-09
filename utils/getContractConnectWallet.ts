import { Contract, Wallet } from "ethers"
export const getContractConnectWallet = async (ethers: any, contract: string, wallet: Wallet): Promise<Contract> => await (await ethers.getContract(contract)).connect(wallet)
export default getContractConnectWallet;