import React from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useWeb3React } from '@web3-react/core';
import Web3 from "web3/dist/web3.min";
import './index.css';
import NFTitem from './NFTitem';
import NFTsell from './NFTsell';

export const GetNFTBalance = () => {
    const { account, library, chainId } = useWeb3React();
    const [supply, setSupply] = React.useState();
    const web3 = new Web3(Web3.givenProvider);

    const Address = '0x22C177B79860A1E26aF4c69EF2C3da0d35978Fa2';
    const NFTABI = JSON.parse(JSON.stringify(require('./abi/NFTabi.json')));
    const NFTcontract = new web3.eth.Contract(NFTABI, Address);
    React.useEffect(() => {
        if (!!library) {
            let stale = false;

            NFTcontract.methods
                .balanceOf(account)
                .call()
                .then((balance) => {
                    if (!stale) {
                        setSupply(balance);
                    }
                })
                .catch(() => {
                    if (!stale) {
                        setSupply(NaN);
                    }
                });

            return () => {
                setSupply(undefined);
            };
        }
    }, [account, library, chainId]);
    return (
        <>
            <p>
                 {supply === null ? 'Error' : supply ? `Balance: ${supply}` : 'No address'}
            </p>
        </>
    );
};

export const ListNFT = () => {
    const { account, library, chainId } = useWeb3React();
    const [supply, setSupply] = React.useState();
    const [allnft, setAllnft] = React.useState();
    const web3 = new Web3(Web3.givenProvider);

    const Address = '0x22C177B79860A1E26aF4c69EF2C3da0d35978Fa2';
    const NFTABI = JSON.parse(JSON.stringify(require('./abi/NFTabi.json')));
    const NFTcontract = new web3.eth.Contract(NFTABI, Address);
    let NFTinfo = [];

    React.useEffect(() => {
        if (!!library) {
            let stale = false;

            NFTcontract.methods
                .balanceOf(account)
                .call()
                .then((balance) => {
                    if (!stale) {
                        setSupply(balance);
                        for(var i = 0; i < balance; i++) {
                            NFTcontract.methods.tokenOfOwnerByIndex(account, i).call()
                            .then((id) => {
                                NFTcontract.methods.tokenURI(id).call().then((uri) => {
                                    const newNFTs = {
                                        url: uri,
                                        author: "TaroLend",
                                        id: id,
                                        period: 0,
                                        price: 0,
                                        status: "not borrowed"
                                    }
                                    NFTinfo.push(newNFTs);
                                    setAllnft(NFTinfo);
                                })
                            }); 
                        }
                    }
                })
                .catch(() => {
                    if (!stale) {
                        setSupply(NaN);
                    }
                });

        

            
            return () => {
                setSupply(undefined);
            };
        }

        if(!account){
            setAllnft([]);
        }

    }, [account, library, chainId]);

    if(allnft !== undefined){
        return (
            <>
                {
                    allnft.map((anft) => {
                        return (
                            <NFTitem NFT={anft}/>
                        )
                    })
                }
            </>
        );
    }else {
        return (
            <></>
        );
    }
};


export const FindNFT = () => {
    const { account, library, chainId } = useWeb3React();
    const [marketbalance, setMakretbalance] = React.useState();
    const [marketnft, setMarketnft] = React.useState();
    const web3 = new Web3(Web3.givenProvider);

    const NFTAddress = '0x22C177B79860A1E26aF4c69EF2C3da0d35978Fa2';
    const NFTABI = JSON.parse(JSON.stringify(require('./abi/NFTabi.json')));
    const NFTcontract = new web3.eth.Contract(NFTABI, NFTAddress);

    const Address = '0x63ce414466a70CDe7986D238Cf0Ada810b3Af3E5';
    const LendABI = JSON.parse(JSON.stringify(require('./abi/Lendingabi.json')));
    const Lendingcontract = new web3.eth.Contract(LendABI, Address);
    let MarketNFTinfo = [];

    React.useEffect(() => {
        if (!!library && !!account) {

            let stale = false;

            NFTcontract.methods
                .balanceOf(Address)
                .call()
                .then((balance) => {
                    if (!stale) {
                        setMakretbalance(balance);
                        for(var i = 0; i < balance; i++) {
                            NFTcontract.methods.tokenOfOwnerByIndex(Address, i).call()
                            .then((id) => {
                                Lendingcontract.methods.listing(id).call().then((info) => {
                                    // console.log(info[0]);
                                    if(info.owner === account){
                                        const newNFTs = {
                                            url: info.uri,
                                            author: "TaroLend",
                                            id: id,
                                            period: info.term,
                                            price: info.price,
                                            status: info.borrowed ? "borrowed" : "not borrowed"
                                        }
                                        MarketNFTinfo.push(newNFTs);
                                        setMarketnft(MarketNFTinfo);
                                    }
                                })
                            }); 
                        }
                    }
                })
                .catch(() => {
                    if (!stale) {
                        setMakretbalance(NaN);
                    }
                });

        }

        if(!account){
            setMarketnft([]);
        }

    }, [account, library, chainId]);

    

    if(marketnft !== undefined){
        return (
            <>
                {
                    marketnft.map((anft) => {
                        return (
                            <NFTsell NFT={anft} />
                        )
                    })
                }
            </>
        );
    }else {
        return (
            <></>
        );
    }
};



export const AddNFT = () => {

    const { account, library, chainId } = useWeb3React();
    const web3 = new Web3(Web3.givenProvider);
    const [uri, setUri] = React.useState();

    const Address = '0x22C177B79860A1E26aF4c69EF2C3da0d35978Fa2';
    const NFTABI = JSON.parse(JSON.stringify(require('./abi/NFTabi.json')));
    const NFTcontract = new web3.eth.Contract(NFTABI, Address);

    const setnewNFT = () => {
        let stale = false;
        if (!!library) {
            console.log(account, uri)
            NFTcontract.methods
            .safeMint(account, uri)
            .send({from: account})
            .then((id) => {
                console.log(id);
            })
            .catch(() => {
                if (!stale) {
                    console.log("err")
                }
            });

            
        }
    }

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Control type="number" placeholder="ID" onChange={(e) => setUri(e.target.value)}/>
                </Form.Group>
            </Form>
            <Button onClick={setnewNFT}>
                NewNFT
            </Button>

        </>
    );
};