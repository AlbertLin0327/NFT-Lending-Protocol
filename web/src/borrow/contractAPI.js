import Web3 from "web3/dist/web3.min";
import {lendingFactoryContractABI, lendingFactoryContractAddress} from "./lendingFactoryContractInfo.js";
import {lendingContractABI} from "./lendingContractInfo.js";
import {NFTContractABI} from "./NFTContractInfo.js";
const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/2212e5cd50684dfbb50558224068f346"));
const web3js = new Web3(web3.currentProvider);
const lendingFactoryContract = new web3js.eth.Contract(lendingFactoryContractABI,lendingFactoryContractAddress);

async function getAllNFT() {
    // let MarketNFTs = [{
    //     url: "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/5221.png",
    //     author: "Azuki",
    //     id: "Azuki #5221",
    //     period: 12,
    //     price: 10,
    //     status: "not borrowed"
    // },{
    //     url: "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/4002.png",
    //     author: "Azuki",
    //     id: "Azuki #4002",
    //     period: 6,
    //     price: 20,
    //     status: "borrowed"
    // }];

    let MarketNFTs = [];
    let lendingAddresses = [];
    let i = 0;
    while(true){
        try{
            let lendingAddress = await lendingFactoryContract.methods.NFTList(i).call();
            lendingAddresses.push(lendingAddress)
            i++;
        } catch {
            break;
        }
    }
    for(let address of lendingAddresses){
        let lendingNFT = await getLendingAddressInfo(address);
        MarketNFTs = MarketNFTs.concat(lendingNFT)
    }

    return MarketNFTs;
}

async function getLendingAddressInfo(address) {
    let lendingNFT = [];
    let lendingContract = new web3js.eth.Contract(lendingContractABI, address);
    let NFTAddress = await lendingContract.methods.NFT().call();
    let NFTContract = new web3js.eth.Contract(NFTContractABI, NFTAddress);
    let ids = [];
    let i = 0;
    while(true){
        try{
            let id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
            ids.push(id)
            i++;
        } catch {
            break;
        }
    }
    for(let id of ids){
        let lender = await lendingContract.methods.listing(id).call();
        // console.log(lender)
        let NFTId = id;
        let NFTUrl = await NFTContract.methods.tokenURI(id).call();
        let NFTPeriod = lender['term'];
        let NFTPrice = lender['price'];
        let NFTPremium = lender['premium'];
        let NFTStatus = lender['borrowed'];
        // console.log("Address: ", address)
        // console.log("id: ", NFTId, ", url: ", NFTUrl, ", period: ", NFTPeriod, ", price: ", NFTPrice, ", premium: ", NFTPremium, ", status: ", NFTStatus);
        lendingNFT.push({
            lendingAddress: address,
            url: NFTUrl,
            author: "Azuki",
            id: NFTId,
            period: NFTPeriod,
            price: NFTPrice,
            premium: NFTPremium,
            status: (NFTStatus)? "borrowed" : "not borrowed"
        })
    }
    return lendingNFT;
}

async function borrow(address, id, value, account) {
    let lendingContract = new web3js.eth.Contract(lendingContractABI, address);
    // let lender = await lendingContract.methods.listing(id).call();
    // console.log(lender)
    console.log(address, id, value, account);
    lendingContract.methods.borrow(parseInt(id))
    .send({from: account, value: web3js.utils.toWei(value.toString(), "ether")})
    .on("receipt", function(receipt) {
        console.log(receipt)
        alert("Success")
    })
    .on("error", function(error) {
        console.log(error)
        alert("Error")
    });
}

export {
    getAllNFT,
    borrow
}