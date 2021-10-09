// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

/**
  * @title TokensToSharesLib Smart Contract
  * @author Kames Geraghty
  * @notice The TokensToSharesLib contract is a library for converting tokens to shares.
 */
library SharesLib {
  
    /** @notice Get draw ring buffer index pointer.
      * @param _amount      The buffer to get the `nextIndex` from.
      * @param _totalSupply The draw id to get the index for.
      * @param _held        The draw id to get the index for.
      * @return allocation
      */
    function getMintAmount(uint256 _amount, uint256 _totalSupply, uint256 _held) internal pure returns (uint256 allocation) {
      if (_totalSupply == 0) {
            allocation = _amount;
        } else {
            allocation = (_amount * _totalSupply) / _held;
        }
    }
    
    function getReleaseAmount(uint256 _amount, uint256 _totalSupply, uint256 _held) internal pure returns (uint256 allocation) {
      if (_totalSupply == 0) {
            allocation = _amount;
        } else {
            allocation = (_amount * _totalSupply) / _held;
        }
    }
}
