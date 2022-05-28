import axios from "axios";
import React from "react";
import {Link, useParams} from "react-router-dom";
import SellerInfo from "./SellerInfo";
import AuctionBids from "./AuctionBids";

const Auction = () => {
    const {id} = useParams();
    const [auction, setAuction] = React.useState<auctions>({
        auctionId: 0,
        categoryId: 0,
        description: "",
        endDate: "",
        highestBid: 0,
        numBids: 0,
        reserve: 0,
        sellerFirstName: "",
        sellerId: 0,
        sellerLastName: "",
        title: ""
    });
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    React.useEffect(() => {
        const getOneAuction = () => {
            axios.get('http://localhost:4941/api/v1/auctions/'+id)
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    setAuction(response.data)
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
        getOneAuction()
    }, [id])
    const endDate = () => {
        const receivedDate = new Date(auction.endDate)
        return receivedDate.toDateString();
    }

    if(errorFlag) {
        return (
            <div>
                <h1>Error</h1>
                <div style={{color: "red"}}>
                    {errorMessage}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>{auction.title}</h1>
                <img src={'http://localhost:4941/api/v1/auctions/'+ id + "/image"}/>
                <p>{auction.description}</p>
                <h3>Auction ends on: &nbsp;{endDate()}</h3>
                <SellerInfo sellerId={auction.sellerId} sellerFirstName={auction.sellerFirstName} sellerLastName={auction.sellerLastName}/>
                <AuctionBids id={id} />
            </div>
        )
    }
}
export default Auction;