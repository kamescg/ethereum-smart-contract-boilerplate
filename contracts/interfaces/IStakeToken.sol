// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
  * @title IStakeToken Smart Contract
  * @author Kames Geraghty
  * @notice The IStakeToken interface defines a standard for staking tokens and minting shares.
 */
interface IStakeToken {

    /**
      * @notice Emit when token is staked.
    */
    event Deposit(address indexed user, uint256 deposited, uint256 minted);

    /**
      * @notice Emit when token is staked.
    */
    event Withdraw(address indexed user, uint256 burned, uint256 withdrawn);
    /**
      * @notice Emit when token is staked.
    */
    event TokenSet(IERC20 indexed token);
    
    /**
      * @notice Emit when interest is set.
    */
    event InterestSet(uint256 indexed interest);

    /**
      * @notice Deposit token and mint shares.
      * @param  amount when token is staked.
    */
    function deposit(uint256 amount) external;

    /**
      * @notice Burn shares and withdraw tokens.
      * @param  amount when token is staked.
    */    
    function withdraw(uint256 amount) external;
    
    
    function execute() external;
    
    function capture() external;
    
    /**
      * @notice Get interest variable.
    */   
    function getInterest() external view returns (uint256);

    /**
      * @notice Get token variable.
    */     
    function getToken() external view returns (IERC20);

    /**
      * @notice Set interest variable.
      * @param newInterest Interest rate to set
    */   
    function setInterest(uint256 newInterest) external;
}
