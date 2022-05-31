import React from "react";

import { Form, Col, Row, Button } from "react-bootstrap";
import './index.css';

const NFTitem = (props) => {
    
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
                    <Col className="col-3">
                        <Form>
                            <Form.Group>
                                <Form.Select>
                                    <option>Lending Period</option>
                                    <option value="1">1 month</option>
                                    <option value="3">3 months</option>
                                    <option value="6">6 months</option>
                                    <option value="12">12 months</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col className="col-3">
                        <Form>
                            <Form.Group>
                                <Form.Control type="number" placeholder="Price (per month)" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col className="col-2">
                        <Button variant="outline-success">
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