import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './index.css';
import NFTlist from "./NFTlist";
import {contract, getAllNFT} from "./contractAPI"

const Borrow = () => {
    const [NFTs, setNFTs] = useState([]);
    useEffect(() => {
        getAllNFT().then((res) => {
            setNFTs(res);
        })
    }, [])
    return (
        <>
            <Container className="px-5 py-2 mt-3 home-background">
                <h3>NFT Borrowing</h3>
                <h5>Put your NFT assets up as collateral for a loan.</h5>
            </Container>
            <Container className="px-5 my-3 home-background">
                <Row>
                    <Col className="col-4">
                        <h5 className="pt-3" >NFTs in market</h5>
                    </Col>
                    <Col className="col">
                        <p className="pt-3">Period</p>
                    </Col>
                    <Col className="col">
                        <p className="pt-3">Price</p>
                    </Col>
                    <Col className="col">
                        <p className="pt-3">Premium</p>
                    </Col>
                    <Col className="col">
                        <p className="pt-3"></p>
                    </Col>
                </Row>
                {NFTs.map(NFT => {
                    if(NFT.status !== "borrowed"){
                        return (
                            <NFTlist NFT={NFT} key={NFT.id}/>
                        )
                    }
                })}
            </Container>
        </>
    )

}

export default Borrow;