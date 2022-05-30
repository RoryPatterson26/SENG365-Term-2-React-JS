import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Register = () => {
    // TODO: add picture support
    const [passwordShown, setPasswordShown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [registered, setRegistered] = React.useState(false);
    const handleSubmit = (event: any) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: "http://localhost:4941/api/v1/users/register",
            data: {
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "password": password,
            }
        }).then((response) => {
            setErrorFlag(false)
            setErrorMessage("")
            setRegistered(true);
        }, (error) => {
            setErrorFlag(true)
            if (error.response.status === 403) {
                setErrorMessage("Email already in use");
            } else {setErrorMessage(error.toString())}
        })
    }
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    const reset = (event: any) => {
        event.preventDefault();
        setErrorFlag(false);
    }

    if (errorFlag) {
        return (
            <div>
                <h1>Error</h1>
                <div style={{color: "red"}}>
                    {errorMessage}
                </div>
                <h3>Please <Link to={{pathname: "/register"}} onClick={(event) => reset(event)}>Try Again </Link></h3>
            </div>
        )
    } else {
        if (registered) {
            return (
                <div>
                    <h1>Congratulations you are registered!</h1>
                    <h3>Please <Link to={"/login"}>Login </Link> to use your account</h3>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Register</h1>
                    <form onSubmit={event => handleSubmit(event)}>
                        <div className="form-group">
                            <p>If you would like to add a photo you can do this later when editing your Profile</p>
                            <label htmlFor="inputFirstName">First Name</label>
                            <input type="text" className="form-control" id="inputFirstName"
                                   placeholder="First Name"
                                   onChange={(e) => setFirstName(e.target.value)}
                                   value={firstName}
                                   required={true}/>
                            <label htmlFor="inputLastName">First Name</label>
                            <input type="text" className="form-control" id="inputLastName"
                                   placeholder="Last Name"
                                   onChange={(e) => setLastName(e.target.value)}
                                   value={lastName}
                                   required={true}/>
                            <label htmlFor="inputEmail">Email address</label>
                            <input type="email" className="form-control" id="inputEmail"
                                   placeholder="Enter email"
                                   onChange={(e) => setEmail(e.target.value)}
                                   value={email}
                                   required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type={passwordShown ? "text" : "password"} className="form-control" id="inputPassword"
                                   placeholder="Password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   value={password}
                                    minLength={6}
                                    required={true}/>
                            <input type="checkbox" className="form-check-input" id="passwordCheck" onClick={() => togglePassword()}/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            )
        }
    }


}

export default Register;