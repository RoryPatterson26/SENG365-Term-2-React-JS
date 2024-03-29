import React from "react";
import {Button, Modal} from "react-bootstrap";
const Navbar = () => {
    // Navigation Bar for site that is on every page so the user can move efficiently around the site
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logOut = () => {
        sessionStorage.setItem("token", '');
        sessionStorage.setItem("userId", '');
        handleClose();
    }
    try {
        const thing = sessionStorage.getItem("token")!.length < 1
    } catch {
        sessionStorage.setItem("token", '');
        sessionStorage.setItem("userId", '');
    }
    const isLoggedIn = () => {
        // Checking user is logged in so logout can be displayed in navbar instead of login
        if (sessionStorage.getItem("token")!.length < 1 ) {
            return (<a className="nav-link" href="../login"> Log in </a>)
        } else {
            return (
                <div>
                    <Button variant="primary" onClick={handleShow}>
                        Log out
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Log out</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to log out?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={logOut}>Log Out</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )

        }
    }

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
                        <a className="nav-link" href="../user">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="../createauction">Create Auction</a>
                    </li>
                </ul>
                {isLoggedIn()}
            </div>
        </nav>
    );
};

export default Navbar;