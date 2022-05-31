//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

/// @title NFT Lender main contract
/// @author hklin
/// @notice Every contract stands for one NFT
/// @dev    Notice that this should be produce by an upgradable extension

/// @notice Record each NFT id's lender
struct Lender {
    bool borrowed;
    address owner;
    uint256 price;
    uint256 term;
    uint256 premium;
}

/// @notice Record borrower for an NFT id
struct Borrower {
    address addr;
    uint256 startingTime;
}

contract NFTLend is Ownable, ReentrancyGuard, ERC721Holder {
    /*************************
     **    MAIN VARIABLE     **
     *************************/

    address public immutable NFT;
    mapping(uint256 => Lender) public listing;
    mapping(uint256 => Borrower) public debt;
    mapping(address => uint256) public earning;

    constructor(address NFT_) {
        NFT = NFT_;
    }

    /*************************
     **    HELPER SECTION    **
     *************************/

    event Lend(uint256 id, address sender);
    event unLend(uint256 id, address sender);
    event Borrow(uint256 id, address sender, uint256 amount);
    event Repay(uint256 id, address sender, uint256 amount);
    event Execute(uint256 id, address executor, uint256 amount);

    /*************************
     **     USER SECTION    **
     *************************/

    function lend(
        uint256 _id,
        uint256 _price,
        uint256 _term,
        uint256 _premium
    ) external nonReentrant {
        require(IERC721(NFT).ownerOf(_id) == msg.sender, "mismatch holder");
        require(_price > 0, "non zero price");
        require(_term > 0, "non zero term");

        IERC721(NFT).safeTransferFrom(msg.sender, address(this), _id);

        Lender memory lender = Lender({
            borrowed: false,
            owner: msg.sender,
            price: _price,
            term: _term,
            premium: _premium
        });

        listing[_id] = lender;

        emit Lend(_id, msg.sender);
    }

    function unlend(uint256 _id) external nonReentrant {
        Lender memory currentLender = listing[_id];
        require(currentLender.borrowed == false, "current borrowed");
        require(currentLender.owner == msg.sender, "not the owner");

        listing[_id] = Lender({
            borrowed: false,
            owner: address(0),
            price: 0,
            term: 0,
            premium: 0
        });

        IERC721(NFT).safeTransferFrom(address(this), msg.sender, _id);

        emit unLend(_id, msg.sender);
    }

    function borrow(uint256 _id) external payable nonReentrant {
        Lender memory currentLender = listing[_id];
        require(currentLender.borrowed == false, "current borrowed");
        require(currentLender.term > 0, "not valid");
        require(
            msg.value == currentLender.price + currentLender.premium,
            "incorrect value"
        );

        debt[_id] = Borrower({addr: msg.sender, startingTime: block.timestamp});
        listing[_id].borrowed = true;
        IERC721(NFT).safeTransferFrom(address(this), msg.sender, _id);
        earning[currentLender.owner] += currentLender.premium;

        emit Borrow(_id, msg.sender, msg.value);
    }

    function repay(uint256 _id) external nonReentrant {
        Lender memory currentLender = listing[_id];
        require(currentLender.borrowed == true, "not borrowed");
        require(debt[_id].addr == msg.sender, "not debter");

        IERC721(NFT).safeTransferFrom(msg.sender, address(this), _id);
        listing[_id].borrowed = false;

        debt[_id] = Borrower({addr: address(0), startingTime: 0});
        payable(msg.sender).transfer(currentLender.price);

        emit Repay(_id, msg.sender, currentLender.price);
    }

    function execute(uint256 _id) external nonReentrant {
        Lender memory currentLender = listing[_id];
        require(currentLender.borrowed == true, "not borrowed");
        require(currentLender.owner == msg.sender, "not the owner");
        require(
            debt[_id].startingTime + currentLender.term >= block.timestamp,
            "legal term"
        );

        debt[_id] = Borrower({addr: address(0), startingTime: 0});
        listing[_id] = Lender({
            borrowed: false,
            owner: address(0),
            price: 0,
            term: 0,
            premium: 0
        });
        payable(msg.sender).transfer(currentLender.price);

        emit Execute(_id, msg.sender, currentLender.price);
    }

    function updateLend(
        uint256 _id,
        uint256 _price,
        uint256 _term,
        uint256 _premium
    ) external {
        Lender memory currentLender = listing[_id];
        require(currentLender.borrowed == false, "current borrowed");
        require(currentLender.owner == msg.sender, "not the owner");

        Lender memory lender = Lender({
            borrowed: false,
            owner: msg.sender,
            price: _price,
            term: _term,
            premium: _premium
        });

        listing[_id] = lender;
    }
}
