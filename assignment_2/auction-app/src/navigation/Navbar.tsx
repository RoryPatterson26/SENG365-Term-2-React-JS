import React from "react";
const Navbar = () => {
    // TODO: make profile button go to login page when not logged in
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
                TradeYou
            </a>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="../">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="../search">Search</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="user">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="createauction">Create Auction</a>
                    </li>
                </ul>
                <a className="nav-link" href="login"> Login </a>
            </div>
        </nav>
    );
};

export default Navbar;