import React from "react";
import { useWeb3React } from '@web3-react/core';
import Web3 from "web3/dist/web3.min";
import { Form, Col, Row, Button } from "react-bootstrap";
import './index.css';

const NFTitem = (props) => {

    const [period, setPeriod] = React.useState();
    const [price, setPrice] = React.useState();
    const [premium, setPremium] = React.useState();


    const NFT = props.NFT;

    const { account, library, chainId } = useWeb3React();
    const web3 = new Web3(Web3.givenProvider);

    const Address = '0x63ce414466a70CDe7986D238Cf0Ada810b3Af3E5';
    const LendABI = JSON.parse(JSON.stringify(require('./abi/Lendingabi.json')));
    const Lendingcontract = new web3.eth.Contract(LendABI, Address);
    const NFTAddress = '0x22C177B79860A1E26aF4c69EF2C3da0d35978Fa2';
    const NFTABI = JSON.parse(JSON.stringify(require('./abi/NFTabi.json')));
    const NFTcontract = new web3.eth.Contract(NFTABI, NFTAddress);

    const listitem = () => {
        let stale = false;
        if(!!account && !!library){
            console.log(NFT.id, price, period, premium);
            NFTcontract.methods.approve(Address, NFT.id).send({from: account})
            .then(() => {
                
                Lendingcontract.methods
                    .lend(NFT.id, price, period, premium)
                    .send({from: account})
                    .then(() => {
                        if (!stale) {
                            alert("List item successful!");
                        }
                    })
                    .catch(() => {
                        if (!stale) {
                            alert("error!")
                        }
                    })
            })
        }
    }
    
    if (NFT.url !== undefined && NFT.author !== undefined && NFT.id !== undefined){

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
                        <Form>
                            <Form.Group>
                                <Form.Select onChange={(e) => setPeriod(e.target.value)}>
                                    <option>Period</option>
                                    <option value="1">1 month</option>
                                    <option value="3">3 months</option>
                                    <option value="6">6 months</option>
                                    <option value="12">12 months</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col className="col-2">
                        <Form>
                            <Form.Group>
                                <Form.Control type="number" placeholder="Price (per month)" onChange={(e) => setPrice(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col className="col-2">
                        <Form>
                            <Form.Group>
                                <Form.Control type="number" placeholder="Premium" onChange={(e) => setPremium(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col className="col-2">
                        <Button variant="outline-success" onClick={listitem}>
                            List this NFT
                        </Button>
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

export default NFTitem;