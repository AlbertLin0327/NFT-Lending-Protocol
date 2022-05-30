import React, { useState } from "react";
import { Container, Form, Col, Row, Button, Modal } from "react-bootstrap";
import './index.css';
import { borrow } from "./contractAPI"
import { useWeb3React } from '@web3-react/core';

function handleBorrow(address, id, account) {
    if (address !== undefined && id!== undefined && account !== undefined){
        alert("borrow")
    }
}

const BorrowWindow = ({NFT}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { account } = useWeb3React();
    return (
        <>
            <Button variant="outline-success" onClick={handleShow}>
                borrow
            </Button>
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show} 
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        NFT
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="row listNFT">
                            <img src={NFT.url}/>
                        </Row>
                        <Row className="row mt-4 listNFT">
                            <Col className="col-12 d-flex justify-content-center"><h5>{NFT.id}</h5></Col>
                        </Row>
                        <Row className="row mt-2">
                            <Col className="col-12 d-flex justify-content-center"><h6>Period: </h6><p>{NFT.period} month(s)</p></Col>
                        </Row>
                        <Row className="row mt-2 mb-0">
                            <Col className="col-12 d-flex justify-content-center"><h6>Price: </h6><p>{NFT.price} Ether</p></Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
                    <Button variant="outline-primary" onClick={handleBorrow(NFT.lendingAddress, NFT.id, account), handleClose}>Comfirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



export default BorrowWindow;