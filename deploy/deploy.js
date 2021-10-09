const { chainName } = require('../utils/chainName');
const { dim, cyan, yellow, green, displayResult } = require('../utils/colors');

module.exports = async (hardhat) => {
  const { getNamedAccounts, deployments, getChainId, ethers } = hardhat;
  const { deploy } = deployments;

  let { deployer } = await getNamedAccounts();
  const chainId = parseInt(await getChainId(), 10);

  // 31337 is unit testing, 1337 is for coverage
  const isTestEnvironment = chainId === 31337 || chainId === 1337;

  dim("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  dim(" Starting Contracts Deployment");
  dim("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");

  dim(`Network: ${chainName(chainId)} (${isTestEnvironment ? "local" : "remote"})`);
  dim(`Deployer: ${deployer}`);

  cyan(`\nDeploying ERC20Mintable...`);
  const erc20MintableResult = await deploy("ERC20Mintable", {
      from: deployer,
      args: ["Token", "TOK"],
  });

  displayResult("ERC20Mintable", erc20MintableResult);

  cyan(`\nDeploying StakeToken...`);
  const stakeTokenResult = await deploy("StakeToken", {
      from: deployer,
      args: [
        erc20MintableResult.address, 
        0, 
      ],
  });

  displayResult("StakeToken", stakeTokenResult);


  dim("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  green("Contract Deployments Complete!");
  dim("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
};