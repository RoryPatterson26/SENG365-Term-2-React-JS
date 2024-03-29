import {Link} from "react-router-dom";
import Search from "./Search";

const Home = () => {
    // Home page. Could be updated to include featured auctions or a basic search bar for auctions
    return (
        <div>
            <h1>Trade You</h1>

            <h3>Register: <Link to="./register">Here</Link></h3>
            <h3>Log in: <Link to="./login">Here</Link></h3>
            <br/>
            <Search/>
        </div>

    )
}
export default Home;