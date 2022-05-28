import React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

const Auctions = (props: any) => {
    // TODO: Form for searching auctions

    const [auctions, setAuctions] = React.useState({"auctions": []});
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        getAuctions()
    }, [])

    const getAuctions = () => {
        axios.get(props.url.toString())
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setAuctions(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    };
    const list_of_auctions = () => {
        // TODO: Add hero image
        return auctions["auctions"].map((item: auction) =>
            <tr key={item.auctionId}>
                <th scope="row">{item.auctionId}</th>
                <td><Link to={"/auctions/" + item.auctionId}>{item.title}</Link></td>
                <td>{item.endDate}</td>
                <td>{item.categoryId}</td>
                <td>{item.sellerFirstName} {item.sellerLastName}</td>
                <td>${item.highestBid || 0}</td>
                <td>${item.reserve || 0}</td>

            </tr>
        )
    };
    if(errorFlag) {
        return (
            <div>
                <h1>Users</h1>
                <div style={{color:"red"}}>
                    {errorMessage}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Search Results:</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Closes</th>
                        <th scope="col">Category</th>
                        <th scope="col">Seller Name</th>
                        <th scope="col">Highest Bid</th>
                        <th scope="col">Reserve</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list_of_auctions()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Auctions;