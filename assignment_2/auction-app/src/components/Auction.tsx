import axios from "axios";
import React from "react";
import {Link, useParams} from "react-router-dom";
import SellerInfo from "./SellerInfo";
import AuctionBids from "./AuctionBids";
import PlaceBid from "./PlaceBid";
import EditAuction from "./EditAuction";
import DeleteAuction from "./DeleteAuction";
import Auctions from "./Auctions";

const Auction = () => {
    // Parent Component for the Auction page which contains other components for displaying related information
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
    const [hasBids, setHasBids] = React.useState(false);
    // Gets the requested auction
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
        // Converts date format for display
        const receivedDate = new Date(auction.endDate)
        return receivedDate.toDateString();
    }
    const isSeller = () => {
        // Verifies if the user viewing the page is the auction seller so that they can't bid but can edit
        if (auction.sellerId.toString() === sessionStorage.getItem("userId")) {
            // If auction has a bid it can no longer be edited or deleted
            if (!hasBids) {
                return (
                    <div className="button-group " role="group">
                        <EditAuction auctionId={id}/>
                        <DeleteAuction auctionId={id}/>
                    </div>)
            }
        } else {
            return (<PlaceBid id={id} highestBid={auction.highestBid}/>)
        }
    }
    const sendChildToParent = (dataFromChild: boolean | ((prevState: boolean) => boolean)) => {
        //uses the AuctionBids component to determine if the auction has bids so the display can be correct
        setHasBids(dataFromChild);
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
                <SellerInfo sellerId={auction.sellerId} sellerFirstName={auction.sellerFirstName} sellerLastName={auction.sellerLastName}/> {isSeller()}

                <AuctionBids id={id} sendChildToParent={sendChildToParent}/>
                <h3>Similar Auctions:</h3>
                <Auctions url={"http://localhost:4941/api/v1/auctions/"} params={{"categoryIds": auction.categoryId}}/>
            </div>
        )
    }
}
export default Auction;