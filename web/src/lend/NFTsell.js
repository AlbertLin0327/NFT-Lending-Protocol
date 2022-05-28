import React from "react";

import { Form, Col, Row, Button } from "react-bootstrap";
import './index.css';

const NFTsell = (props) => {
    
    const NFT = props.NFT;
    
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
                            <Button variant="outline-success">
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