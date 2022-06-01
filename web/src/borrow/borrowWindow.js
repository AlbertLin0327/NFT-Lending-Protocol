import React, { useState } from "react";
import { Container, Form, Col, Row, Button, Modal } from "react-bootstrap";
import './index.css';
import { borrow } from "./contractAPI"
import { useWeb3React } from '@web3-react/core';

function handleBorrow(NFT, account) {
    if(account === undefined){
        alert("Connect to wallet");
        return;
    }
    borrow(NFT.lendingAddress, NFT.id, parseInt(NFT.price) + parseInt(NFT.premium), account);
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
                            <Col className="col-12 d-flex justify-content-center"><h5>{`${NFT.author}#${NFT.id}`}</h5></Col>
                        </Row>
                        <Row className="row mt-2">
                            <Col className="col-12 d-flex justify-content-center"><p>Period: {NFT.period} month(s)</p></Col>
                        </Row>
                        <Row className="row mt-2 mb-0">
                            <Col className="col-12 d-flex justify-content-center"><p>Price: {NFT.price} Ether</p></Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
                    <Button variant="outline-primary" onClick={() => {
                        handleBorrow(NFT, account);
                        setShow(false);
                    }}>Comfirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



export default BorrowWindow;