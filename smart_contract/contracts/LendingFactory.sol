//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "./Lending.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LendingFactory is Ownable {
    /*************************
     **    MAIN VARIABLE     **
     *************************/

    mapping(address => address) NFT2Lending;

    constructor() {}

    /*************************
     **    ADMIN SECTION    **
     *************************/

    event Deployed(address newAddress);

    function create(address _nft) external onlyOwner returns (address) {
        address newAddress = address(new NFTLend(_nft));

        emit Deployed(newAddress);
        return newAddress;
    }
}
