import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import ConnectButton from '../component/ConnectButton';
import './index.css';

const Header = () => {
    return (
        <>
            <Navbar className="navbar-color" sticky="top" expand="lg">
                <Container className="mx-3 my-1" fluid>
                    <Navbar.Brand className="header-brand" href="/" style={{ marginLeft: '1%'}}>
                        TaroLend
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Item style={{ marginLeft: '1%' }}>
                                <Nav.Link href="/lend" style={{ color: 'rgb(255, 255, 255)' }}>
                                    Lend
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item style={{ marginLeft: '1%' }}>
                                <Nav.Link href="/borrow" style={{ color: 'rgb(255, 255, 255)' }}>
                                    Borrow
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Nav>
                            <Nav.Item>
                                <ConnectButton />
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
