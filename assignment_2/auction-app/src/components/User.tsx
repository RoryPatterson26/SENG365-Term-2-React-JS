import React from "react";
import axios from "axios";
import EditProfile from "./EditProfile";
import {useNavigate} from "react-router-dom";
import Auctions from "./Auctions";

const User = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = React.useState(sessionStorage.getItem("userId"));
    const [userInfo, setUserInfo] = React.useState<userReturnWithEmail>({email: "", firstName: "", lastName: ""});
    const [userToken, setUserToken] = React.useState(sessionStorage.getItem("token"));
    const getUser = () => {
        axios({
            method: "get",
            url: "http://localhost:4941/api/v1/users/" + userId,
            headers: {"x-authorization": userToken || ''}
        }).then((response) => {
            setUserInfo(response.data)
        })
    }

    const isLoggedIn = () => {
        if (userId) {
            getUser();
        } else {

            navigate("../login");
        }
    }
    React.useEffect(() => {
        isLoggedIn()
        getUser()
    }, [])
    return (
        <div id="userPage">
            <div id="profileImage">
                <img src={"http://localhost:4941/api/v1/users/" + userId + "/image"} width={200}/>
            </div>
            <div id="userName">
                <h2>{userInfo["firstName"]} {userInfo["lastName"]}</h2>
            </div>
            <div>
                <h3>Email: {userInfo["email"]}</h3>
            </div>
            <div id="editButton">
                <EditProfile userId={userId}/>
            </div>
            <div>
                <h2>Items I'm Selling: </h2>
                <Auctions url={"http://localhost:4941/api/v1/auctions/"} params={{"sellerId": userId}}/>
            </div>
            <div>
                <h2>Auctions I've bid on</h2>
                <Auctions url={"http://localhost:4941/api/v1/auctions/"} params={{"bidderId": userId}}/>
            </div>
        </div>
    )
}
export default User;