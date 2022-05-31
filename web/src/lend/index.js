import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import './index.css';
import NFTitem from "./NFTitem";
import NFTsell from "./NFTsell";

const Lend = () => {

    const Wallet_NFTs = [{
        url: "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/5222.png",
        author: "Azuki",
        id: "Azuki #5222" 
    },{
        url: "https://assets.g.money/metadata/762/700.png",
        author: "Admit One",
        id: "Admit One #0762" 
    }];

    const Market_NFTs = [{
        url: "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/5221.png",
        author: "Azuki",
        id: "Azuki #5221",
        period: 12,
        price: 10,
        status: "not borrowed"
    },{
        url: "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/4002.png",
        author: "Azuki",
        id: "Azuki #4002",
        period: 6,
        price: 20,
        status: "borrowed"
    }];


    return (
        <>
            <Container className="px-5 py-2 mt-3 home-background">
                <h3>NFT Lending</h3>
                <h5>Offer loans to other users on their non-fungible tokens.</h5>
            </Container>
            <Container className="px-5 my-3 home-background">
                <Row>
                    <Col className="col-4">
                        <h5 className="pt-3" >Your NFTs in wallet</h5>
                    </Col>
                </Row>
                {Wallet_NFTs.map((NFT) => {
                    return ( 
                            <NFTitem NFT={NFT} />
                    );
                })}
            </Container>
            <Container className="px-5 my-3 home-background">
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
                {Market_NFTs.map((NFT) => {
                    return ( 
                            <NFTsell NFT={NFT} />
                    );
                })}
                
            </Container>
        </>
    )

}

export default Lend;