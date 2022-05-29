import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const EditProfile = (props: any) => {
    const [show, setShow] = React.useState(false);
    const [email, setEmail] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };
    const editContents = () => {
        let thing: any = {};
        if (firstName.length > 0) {
            thing["firstName"] = firstName;
        }
        if (lastName.length > 0) {
            thing["lastName"] = lastName;
        }
        if (email.length > 0) {
            thing["email"] = email;
        }
        if (newPassword.length > 0) {
            thing["password"] = newPassword
            thing["currentPassword"] = currentPassword
        }
        return thing;
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleClose()
        editContents()
        axios({
            method: "patch",
            url: "http://localhost:4941/api/v1/users/" + props.userId,
            headers: {"x-authorization": sessionStorage.getItem("token") || ''},
            data: editContents()
        }).then((response) => {
            setErrorFlag(false)
            setErrorMessage("")
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
    }
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Edit Profile
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Modal.Body>
                        <label htmlFor="editFirstName">First Name</label>
                        <input type="text" className="form-control" id="editFirstName"
                               placeholder="First Name"
                               onChange={(e) => setFirstName(e.target.value)}
                               value={firstName}/>

                        <label htmlFor="editLastName">First Name</label>
                        <input type="text" className="form-control" id="editLastName"
                               placeholder="Last Name"
                               onChange={(e) => setLastName(e.target.value)}
                               value={lastName}/>

                        <label htmlFor="editEmail">Email address</label>
                        <input type="email" className="form-control" id="editEmail"
                               placeholder="Enter email"
                               onChange={(e) => setEmail(e.target.value)}
                               value={email}/>

                        <h5 style={{color: "red"}}>If you are changing your password you must supply your current password</h5>

                        <label htmlFor="editPassword">New Password</label>
                        <input type={passwordShown ? "text" : "password"} className="form-control" id="editPassword"
                               placeholder="Password"
                               onChange={(e) => setNewPassword(e.target.value)}
                               value={newPassword}
                               minLength={6}/>

                        <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                        <input type="checkbox" className="form-check-input" id="passwordCheck" onClick={() => togglePassword()}/>

                        <label htmlFor="editPassword">Current Password</label>
                        <input type={passwordShown ? "text" : "password"} className="form-control" id="editPassword"
                               placeholder="Password"
                               onChange={(e) => setCurrentPassword(e.target.value)}
                               value={currentPassword}
                               minLength={6}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" >Confirm Edit</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}
export default EditProfile;