import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const CreateAuction = () => {
    // States needed for acquiring info needed for creating auction
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [categories, setCategories] = React.useState([{categoryId: 0, name: "unavailable"}]);
    const [reserve, setReserve] = React.useState('1')
    const [chosenCategory, setChosenCategory] = React.useState("1");
    const [endDate, setEndDate] = React.useState('');
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [createdAuction, setCreatedAuction] = React.useState({"auctionId": 0});
    const [successful, setSuccessful] = React.useState(0);

    const getCategories = () => {
        // gets categories so that the name can be displayed instead of the number
        axios({
            method: "get",
            url: "http://localhost:4941/api/v1/auctions/categories"
            }
        ).then((response) => {
            setCategories(response.data)

        }, (error) => {

        })
    }
    React.useEffect(() => {
        getCategories()
    }, [])
    const categorySelect = () => {
        // Options for category dropdown as user can not create their own
        return categories.map((item: category) =>
            <option key={item.categoryId} value={item.categoryId} selected={item.categoryId === 1}>{item.name}</option>
        )
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // Submits JSON with information to the server
        event.preventDefault()
        // sets reserve default
        if (parseInt(reserve, 10) < 1 || reserve === '') {
            setReserve('1')
        }
        axios({
                method: "post",
            url: "http://localhost:4941/api/v1/auctions",
            headers: {"x-authorization": sessionStorage.getItem("token") || ''},
            data: {
                    "title": title,
                    "description": description,
                    "reserve": reserve,
                    "categoryId": parseInt(chosenCategory),
                    "endDate": new Date(endDate).toISOString().replace("T", " ").replace("Z", "")
            }
        }).then((response) => {
            setErrorFlag(false)
            setErrorMessage("")
            setCreatedAuction(response.data["auctionId"]);
            setSuccessful(response.status);
        }, (error) => {
            setErrorFlag(true)
            setErrorMessage(error.toString())
        })

    }

    if (errorFlag) {
        return (
            <div>
                <h1>Error</h1>
                <div style={{color: "red"}}>
                    {errorMessage}
                </div>

            </div>
        )
    } else {
        if (successful) {
            return (
                <div>
                    <h1>Auction Created</h1>
                    <br/>
                    <h3>Click <a href={"../auctions/"+ createdAuction} >here </a> to view auction</h3>
                </div>
            )
        }
        return (
            <div id="createAuctionDiv">
                <h1>Create an Auction:</h1>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <p>If you would like to add a photo you can do this later when editing an auction</p>
                    <div className="form-group" id="titleDiv">
                        <label htmlFor="createTitle">Auction title:</label>
                        <input type="text" id="createTitle" placeholder="Title..."
                               onChange={(e) => setTitle(e.target.value)}
                               value={title} required={true}/>
                    </div>
                    <div className="form-group" id="descriptionDiv">
                        <label htmlFor="createDescription">Auction description:</label>
                        <input type="text" id="createDescription" placeholder="Description..."
                               onChange={(e) => setDescription(e.target.value)}
                               value={description} required={true}/>
                    </div>
                    <div className="form-group" id="endDateDiv">
                        <label htmlFor="createEndDate">Auction close date: </label>
                        <input type="datetime-local" id="createEndDate" min={(new Date()).toString()} required={true} value={endDate}
                               onChange={(e) => setEndDate(e.target.value)}/>
                    </div>
                    <div id="categoryDiv" className="form-group">
                        <label htmlFor="selectCategory">Category: &nbsp; </label>
                        <select id="categorySelect" onChange={(e) => setChosenCategory(e.target.value)}>
                            {categorySelect()}
                        </select>
                    </div>
                    <div className="form-group" id="endDateDiv">
                        <label htmlFor="createReserve">Reserve: $</label>
                        {/* Setting min value as well as assuming reserve can only be a whole number */}
                        <input type="text"
                               pattern="[0-9]*"
                               placeholder="1"
                               value={reserve}
                               onChange={(e) =>
                                   setReserve((v) => (e.target.validity.valid ? e.target.value : v))
                               }/>
                    </div>
                    <div id="submitAuction">
                        <button type="submit" className="btn btn-primary">Create Auction</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default CreateAuction;