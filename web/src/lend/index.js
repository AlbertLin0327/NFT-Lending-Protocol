import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import { GetNFTBalance, AddNFT, ListNFT, FindNFT } from "./getNFTbalance";
import './index.css';

const Lend = () => {

    return (
        <>
            <Container className="px-5 py-2 mt-3 home-background">
                <h3>NFT Lending</h3>
                <h5>Offer loans to other users on their non-fungible tokens.</h5>
            </Container>
            <Container className="px-5 py-3 my-3 home-background">
                <Row>
                    <Col className="col-4">
                        <h5 className="pt-3" >Your NFTs in wallet</h5>
                    </Col>
                </Row>
                <ListNFT />
            </Container>
            <Container className="px-5 py-3 my-3 home-background">
                <Row>
                    <Col className="col-4">
                        <h5 className="pt-3" >Your NFTs in market</h5>
                    </Col>
                    <Col className="col-2">
                        <p className="pt-3">Period</p>
                    </Col>
                    <Col className="col-2">
                        <p className="pt-3">Price</p>
                    </Col>
                    <Col className="col-2">
                        <p className="pt-3">Status</p>
                    </Col>
                </Row>
                <FindNFT />
            </Container>
            {/* <Container className="px-5 py-3 my-3 home-background">
                <h1>1111</h1>
                <GetNFTBalance />
                <AddNFT />
            </Container> */}
        </>
    )

}

export default Lend;