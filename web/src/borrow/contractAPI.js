import Web3 from "web3/dist/web3.min";
import {lendingFactoryContractABI, lendingFactoryContractAddress} from "./lendingFactoryContractInfo.js";
import {lendingContractABI} from "./lendingContractInfo.js";
import {NFTContractABI} from "./NFTContractInfo.js";
const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/2212e5cd50684dfbb50558224068f346"));
const web3js = new Web3(web3.currentProvider);
const contract = new web3js.eth.Contract(lendingFactoryContractABI, lendingFactoryContractAddress);

function getAllNFT() {
    const MarketNFTs = [{
        url: "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/5221.png",
        author: "Azuki",
        id: "Azuki #5221",
        period: 12,
        price: 10,
        status: "not borrowed"
    },{
        url: "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/4002.png",
        author: "Azuki",
        id: "Azuki #4002",
        period: 6,
        price: 20,
        status: "borrowed"
    }];

    // let MarketNFTs = [];
    // let lendingAddresses  = contract.methods.NFTList().call();
    // for(let address in lendingAddresses) {
    //     MarketNFTs = MarketNFTs.concat(getLendingAddressInfo(address));
    // }

    return MarketNFTs;
}

function getLendingAddressInfo(address) {
    let lendingNFT = [];
    let lendingContract = new web3js.eth.Contract(lendingContractABI, address);
    let NFTAddress = lendingContract.methods.NFT().call();
    let listing = lendingContract.methods.listing().call();
    for(const [key, value] of Object.entries(listing)){
        let NFTId = key;
        let NFTUri = getNFTAddressInfo(NFTAddress, key);
        let NFTPeriod = value['term'];
        let NFTPrice = value['price'];
        let NFTStatus = value['borrowed'];
        lendingNFT.push({
            lendingAddress: address,
            url: NFTUri,
            author: "Azuki",
            id: NFTId,
            period: NFTPeriod,
            price: NFTPrice,
            status: (NFTStatus)? "borrowed" : "not borrowed"
        })
    }
    return lendingNFT;
}

function getNFTAddressInfo(address, Id) {
    let NFTContract = new web3js.eth.Contract(NFTContractABI, address);
    return NFTContract.methods.tokenURI().call();
}

function borrow(address, id, account) {
    let lendingContract = new web3js.eth.Contract(lendingContractABI, address);
    lendingContract.eth.borrow(id)
    .send({from: account})
    .on("receipt", function(receipt) {
        alert("Success")
    })
    .on("error", function(error) {
        alert("Error")
    });
}

export {
    getAllNFT,
    borrow
}