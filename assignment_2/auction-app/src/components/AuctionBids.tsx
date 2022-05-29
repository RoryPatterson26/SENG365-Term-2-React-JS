import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const AuctionBids = (props: any) => {

    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [auctionBids, setAuctionBids] = React.useState<Array<bid>>([])

    const getAuctionBids = () => {
        axios.get('http://localhost:4941/api/v1/auctions/'+ props.id.toString() + "/bids")
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setAuctionBids(response.data)
                if (auctionBids.length > 1) {
                    props.sendChildToParent(true)
                }
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })

    }
    React.useEffect(() => {

        getAuctionBids()
    }, [props.id])

    const listOfBids = () => {
        // TODO: Add hero image
        return auctionBids.map((item: bid) =>
            <tr key={item.bidderId}>
                <th scope="row"><img className="img-thumbnail" height="50" width="50" src={'http://localhost:4941/api/v1/users/'+ item.bidderId.toString() + "/image"}/></th>
                <td>{item.firstName} {item.lastName}</td>
                <td>${item.amount}</td>
                <td>{new Date(item.timestamp).toLocaleTimeString()} {new Date(item.timestamp).toDateString()}</td>
            </tr>
        )
    };

    return (
        <div>
            <h1>Bids on Auction</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Profile</th>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Time Placed</th>
                </tr>
                </thead>
                <tbody>
                {listOfBids()}
                </tbody>
            </table>
        </div>
    )
}
export default AuctionBids;