import React, {useState} from "react";
import { Form, Col, Row, Button, Modal} from "react-bootstrap";
import './index.css';
import BorrowWindow from "./borrowWindow"


const NFTlist = ({NFT}) => {
    if (NFT.id !== undefined){
        return (
            <>
                <Row className="py-3 listNFT">
                    <Col className="col-2">
                        <img src={NFT.url} />
                    </Col>
                    <Col className="col-2">
                        <h5>{NFT.author}</h5>
                        <p>{`#${NFT.id}`}</p>
                    </Col>
                    <Col className="col">
                        <p>{NFT.period} month(s)</p>
                    </Col>
                    <Col className="col">
                        <p>{NFT.price} Ether</p>
                    </Col>
                    <Col className="col">
                        <p>{NFT.premium} Ether</p>
                    </Col>
                    <Col className="col">
                        <BorrowWindow NFT={NFT}/>
                    </Col>
                </Row>
            </>
        );
    }else{
        return (
            <></>
        );
    }
}

export default NFTlist;