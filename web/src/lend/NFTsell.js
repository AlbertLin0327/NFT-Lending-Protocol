import React from "react";
import { useWeb3React } from '@web3-react/core';
import Web3 from "web3/dist/web3.min";
import { Form, Col, Row, Button } from "react-bootstrap";
import './index.css';

const NFTsell = (props) => {
    
    const NFT = props.NFT;
    
    const { account, library, chainId } = useWeb3React();
    const web3 = new Web3(Web3.givenProvider);
    const Address = '0x63ce414466a70CDe7986D238Cf0Ada810b3Af3E5';
    const LendABI = JSON.parse(JSON.stringify(require('./abi/Lendingabi.json')));
    const Lendingcontract = new web3.eth.Contract(LendABI, Address);

    const Unlist = () => {
        if(!!library && !!account){
            Lendingcontract.methods.unlend(NFT.id).send({from: account})
            .then(() => {
                alert("Successful unlist the NFT");
            }).catch(() => {
                alert("Error!");
            });
        }

    }
    
    if (NFT.author !== undefined && NFT.id !== undefined){

        return (
            <>
                <Row className="py-3 listNFT">
                    <Col className="col-2">
                        <img src={NFT.url} />
                    </Col>
                    <Col className="col-2">
                        <h5>{NFT.author}</h5>
                        <p>{NFT.id}</p>
                    </Col>
                    <Col className="col-2">
                        <p>{NFT.period} month(s)</p>
                    </Col>
                    <Col className="col-2">
                        <p>{NFT.price} Ether</p>
                    </Col>
                    <Col className="col-2">
                        <p>{NFT.status}</p>
                    </Col>
                    <Col className="col-2">
                        {(NFT.status !== "borrowed") ? 
                            <Button variant="outline-success" onClick={Unlist}>
                                unlist
                            </Button>
                        :
                        <></>
                        }
                    </Col>
                </Row>
            </>
        );
    }
    else {
        return (
            <></>
        );
    }
}

export default NFTsell;