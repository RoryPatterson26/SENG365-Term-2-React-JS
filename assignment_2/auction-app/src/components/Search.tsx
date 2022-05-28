import React, {useState} from "react";
//import axios from "axios";
import Auctions from "./Auctions";
const Search = () => {
    const [search, setSearch] = useState('');
    const [url, setUrl] = React.useState("http://localhost:4941/api/v1/auctions");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const url2 = "http://localhost:4941/api/v1/auctions";
    const handleSubmit = (event: any) => {
        event.preventDefault();
        setUrl(url2 + "?q=" + search.toString());
        setIsSubmitted(true);
    };
    if (isSubmitted) {
        return (
            <Auctions url={url}/>
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
                        <h3>filter sort pagination</h3>
                    </div>
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
            </div>
        )
    }
}
export default Search;