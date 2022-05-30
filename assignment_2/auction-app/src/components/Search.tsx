import React, {useState} from "react";
//import axios from "axios";
import Auctions from "./Auctions";
import axios from "axios";
const Search = () => {
    const [search, setSearch] = useState('');
    const [url, setUrl] = React.useState("http://localhost:4941/api/v1/auctions");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [sort, setSort] = useState('CLOSING_SOON');
    const [categories, setCategories] = React.useState([{categoryId: 0, name: "unavailable"}]);
    const [chosenCategory, setChosenCategory] = React.useState("0");
    const [status, setStatus] = React.useState("ANY");
    const handleSubmit = (event: any) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    const getCategories = () => {
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
        return categories.map((item: category) =>
            <option key={item.categoryId} value={item.categoryId} >{item.name}</option>
        )
    };

    if (isSubmitted) {
        if (chosenCategory === '0') {
            return (
                <div>
                    <h1>Search Results:</h1>
                    <Auctions url={url} params={{"q": search, "status": status, "sortBy": sort}}/>
                </div>
            )
        }
        return (
            <div>
                <h1>Search Results:</h1>
                <Auctions url={url} params={{"q": search, "status": status, "sortBy": sort, "categoryIds": chosenCategory}}/>
            </div>

        )
    } else {
        return (
            <div id="searchPage">
                <h1>Search</h1>
                <form onSubmit={event => handleSubmit(event)}>
                    <div id="searchBar">
                        <label>Search for Auctions:&nbsp;</label>
                        <input type="search" id="searchBar"
                               onChange={(e) => setSearch(e.target.value)}
                               value={search}/>
                    </div>
                    <div id="filterSort">
                        <h4>Filter By: </h4>
                        <label htmlFor="selectCategory">Category: &nbsp; </label>
                        <select id="categorySelect"  onChange={(e) => setChosenCategory(e.target.value)}>
                            {categorySelect()}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="selectStatus">Status: &nbsp; </label>
                        <select id="selectStatus" onChange={(e) => setStatus(e.target.value)}>
                            <option key='0' value={"ANY"} selected={true}>Any</option>
                            <option key='1' value={"OPEN"} >Open</option>
                            <option key='2' value={"CLOSED"} >Closed</option>
                        </select>
                    </div>
                    <div>
                        <h4>Sort By:</h4>
                        <label htmlFor="selectSort">Status: &nbsp; </label>
                        <select id="selectSort" onChange={(e) => setSort(e.target.value)}>
                            <option key='0' value={"ALPHABETICAL_ASC"} >A-Z</option>
                            <option key='1' value={"ALPHABETICAL_DESC"} >Z-A</option>
                            <option key='2' value={"BIDS_ASC"} >Lowest Bid</option>
                            <option key='3' value={"BIDS_DESC"} >Highest Bid</option>
                            <option key='4' value={"RESERVE_ASC"} >Lowest Reserve</option>
                            <option key='5' value={"RESERVE_DESC"} >Highest Reserve</option>
                            <option key='6' value={"CLOSING_LAST"} >Closing Last</option>
                            <option key='7' value={"CLOSING_SOON"} selected={true}>Closing Soon</option>
                        </select>
                    </div>

                    <br/>
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
            </div>
        )
    }
}
export default Search;