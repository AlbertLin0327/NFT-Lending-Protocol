import React from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import './index.css';

const GetNFTBalance = () => {
    const { library, chainId } = useWeb3React();
    const [supply, setSupply] = React.useState();
    const web3 = new Web3(Web3.givenProvider);

    const Address = '0x631AE0e27541B10ce38562467111D4C2e46D14e9';
    const NFTABI = JSON.parse(JSON.stringify(require('./abi/NFTabi.json')));
    const NFTcontract = new web3.eth.Contract(NFTABI, Address);
    React.useEffect(() => {
        if (!!library) {
            let stale = false;

            NFTcontract.methods
                .balanceOf(address)
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
    }, [address, library, chainId]);
    return (
        <>
            <div className="label">
                 {ustbalance === null ? 'Error' : ustbalance ? `${ustbalance / 1000000000000000000}` : ''}
            </div>
        </>
    );
};

export default GetNFTBalance;