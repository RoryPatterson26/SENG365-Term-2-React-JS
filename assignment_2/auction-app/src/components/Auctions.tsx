import React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

const Auctions = (props: any) => {
    // Functional Component For displaying list of auctions according to search parameters

    const [auctions, setAuctions] = React.useState({"auctions": []});
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [categories, setCategories] = React.useState([{categoryId: 0, name: "unavailable"}]);
    // Gets all resources from server that apply to the searched parameters in the parent component
    const getAuctions = () => {
        axios( {
            method: "get",
            url: props.url,
            params: props.params
        })
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setAuctions(response.data)
            }, (error) => {
                // Error flags for if get request fails
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    };
    const getCategories = () => {
        // Getting Category names as the auctions get request only gives category ID not name
        axios({
                method: "get",
                url: "http://localhost:4941/api/v1/auctions/categories"
            }
        ).then((response) => {
            setCategories(response.data)
            setErrorFlag(false)
            setErrorMessage("")
        }, (error) => {
            setErrorFlag(true)
            setErrorMessage(error.toString())
        })
    }
    React.useEffect(() => {
        getAuctions();
        getCategories()
    }, [])

    const findCategory = (categoryId: number) => {
        // Finds the category name using ID number
        return categories.find(categoryItem => categoryItem.categoryId === categoryId) || {categoryId: 0, name: "unavailable"};

    }

    const list_of_auctions = () => {
        // Creates table body from search results
        return auctions["auctions"].map((item: auction) =>
            <tr key={item.auctionId}>
                <th scope="row"><img src={"http://localhost:4941/api/v1/auctions/" + item.auctionId + "/image"} width="80" /></th>
                <td><Link to={"/auctions/" + item.auctionId}>{item.title}</Link></td>
                <td>{new Date(item.endDate).toLocaleString()}</td>
                <td>{findCategory(item.categoryId).name}</td>
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
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col"/>
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