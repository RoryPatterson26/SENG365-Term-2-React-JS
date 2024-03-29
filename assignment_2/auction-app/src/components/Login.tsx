import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Login = (props: any) => {
    // A login page for the site also prompts users to search auctions once logged in
    const [passwordShown, setPasswordShown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const handleSubmit = (event: any) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: "http://localhost:4941/api/v1/users/login",
            data: {
                "email": email,
                "password": password,
            }
        }).then((response) => {
            setErrorFlag(false)
            setErrorMessage("")
            setLoggedIn(true);
            // Stores token and userId, so they can be accessed globally within the program without a web of states
            sessionStorage.setItem("token", response.data["token"]);
            sessionStorage.setItem("userId", response.data["userId"]);
        }, (error) => {
            setErrorFlag(true)
            setErrorMessage(error.toString())
        })
    };
    const togglePassword = () => {
        // When the handler is invoked
        // invert the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };
    const reset = (event: any) => {
        event.preventDefault();
        setErrorFlag(false);
    };
    if (loggedIn) {
        return (
            <div>
                <h3>Logged in <Link to={{pathname: "/search"}}>Search for an auction </Link></h3>
            </div>
        )
    } else {
        if (errorFlag) {
            return (
                // Failure to login allows user to try again
                <div>
                    <h1>Error</h1>
                    <div style={{color: "red"}}>
                        {errorMessage}
                    </div>
                    <h3>Please <Link to={{pathname: "/login"}} onClick={(event) => reset(event)}>Try Again </Link></h3>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Login</h1>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" id="inputEmail" placeholder="Enter email"
                                   onChange={(e) => setEmail(e.target.value)}
                                   value={email}/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type={passwordShown ? "text" : "password"}  id="inputPassword"
                                   placeholder="Password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   value={password}/>
                            <div>
                                <input type="checkbox" className="form-check-input" id="passwordCheck" onClick={() => togglePassword()}/>
                                <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Log in</button>
                    </form>
                    <h4>Don't have an account? &nbsp;<Link to={"../register"}>Register!!</Link></h4>
                </div>
            )
        }

    }

}

export default Login;