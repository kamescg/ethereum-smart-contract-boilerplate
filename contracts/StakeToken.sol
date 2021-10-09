// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./interfaces/IStakeToken.sol";
import "./libraries/SharesLib.sol";

/**
  * @title StakeToken Smart Contract
  * @author Kames Geraghty
  * @notice The StakeToken contract handles deposits of token and minting of shares.
  * @dev    A deposit token must be set when deploying.
 */
contract StakeToken is IStakeToken, ERC20, Ownable {
    using SharesLib for uint256;

    /* Libraries -------------------------------- */
    using SafeERC20 for IERC20;
    
    /// @notice Mutable interest rate for deposit tokens.
    uint256 internal interest;

    /// @notice Immutable Token address used for deposits.
    IERC20 public immutable token;

    /* ======================================== */
    // Constructor ----------------------------
    /* ======================================== */
    
    /**
      * @notice Set initial smart contract parameters during deploy.
      * @dev    Token is immutable. Once set it CAN NOT be updated.
      * @param _token    Deposit token.
      * @param _interest Interest earned for deposits
    */
    constructor(IERC20 _token, uint256 _interest) ERC20("Shares", "SHR") Ownable() {
        token = _token;
        _setInterest(_interest);
        emit TokenSet(_token);
    }

    /* ======================================== */
    // External Functions ---------------------
    /* ======================================== */

    /// @notice inheritdoc IStakeToken
    function deposit(uint256 _amount) external override {
        uint256 _totalSupply = totalSupply();
        uint256 _shares = SharesLib.getMintAmount(
            _amount,
            _totalSupply, 
            _balance()
        );
        
        // Transfer amount from msg.sender to contract.
        // REQUIRES user to approve contract spending before deposit is executed. 
        token.safeTransferFrom(
            msg.sender,
            address(this),
            _amount
        );

        // Mint calculated shares. 
        _mint(msg.sender, _shares);

        emit Deposit(msg.sender, _amount, _shares);
    }
    
    /// @notice inheritdoc IStakeToken
    function withdraw(uint256 _amount) external override {
        uint256 _totalSupply = totalSupply();
        uint256 _releasing = SharesLib.getReleaseAmount(
            _amount,
            _totalSupply, 
            _totalSupply + token.balanceOf(address(this)
        ));

        // Burn Shares and Return Tokens
        _burn(msg.sender, _amount);

        // Transfer Deposit Token to Message Sender
        token.safeTransfer(msg.sender, _releasing);

        emit Withdraw(msg.sender, _amount, _releasing);

    }

    /// @notice inheritdoc IStakeToken
    function execute() external onlyOwner override {
        IStrategy _strategy = strategy;
        _strategy.deposit(_held());
    }
    
    /// @notice inheritdoc IStakeToken
    function capture() external onlyOwner override {
        IStrategy _strategy = strategy;
        require(_strategy.canBeCaptured(), "StakeToken/strategy-capture-failed");
        _strategy.capture();
    }

    /* Getters -------------------------------- */

    /// @notice inheritdoc IStakeToken
    function getInterest() external view override returns (uint256) {
        return interest;
    }
    
    /// @notice inheritdoc IStakeToken
    function getToken() external view override returns (IERC20) {
        return token;
    }

    /* Setters -------------------------------- */
    
    /// @notice inheritdoc IStakeToken
    function setInterest(uint256 _interest) external override onlyOwner {
        _setInterest(_interest);
    }

    /* ======================================== */
    // Internal Functions ---------------------
    /* ======================================== */

    function _setInterest(uint256 _interest) internal returns (uint256) {
        interest = _interest;
        emit InterestSet(_interest);
        return _interest;
    }
}
