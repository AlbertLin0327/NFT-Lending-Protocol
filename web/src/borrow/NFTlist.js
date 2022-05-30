import React, {useState} from "react";
import { Form, Col, Row, Button, Modal} from "react-bootstrap";
import './index.css';
import BorrowWindow from "./borrowWindow"


const NFTlist = ({NFT}) => {
    if (NFT.url !== undefined && NFT.author !== undefined && NFT.id !== undefined){
        return (
            <>
                <Row className="py-3 listNFT">
                    <Col className="col">
                        <img src={NFT.url} />
                    </Col>
                    <Col className="col">
                        <h5>{NFT.author}</h5>
                        <p>{NFT.id}</p>
                    </Col>
                    <Col className="col">
                        <p>{NFT.period} month(s)</p>
                    </Col>
                    <Col className="col">
                        <p>{NFT.price} Ether</p>
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