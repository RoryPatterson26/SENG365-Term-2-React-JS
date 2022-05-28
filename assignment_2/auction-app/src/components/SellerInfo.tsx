import React from "react";
import axios from "axios";
import {Card} from "react-bootstrap";

const SellerInfo = (props: any) => {
// TODO: NEEDS REFORMATTING AS MOST CODE IS REDUNDANT

    const [sellerImage, setSellerImage] = React.useState();
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const getSellerImage = () => {
        axios.get('http://localhost:4941/api/v1/users/'+ props.sellerId.toString() + "/image")
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setSellerImage(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }
    React.useEffect(() => {

        getSellerImage()
    }, [props.sellerId])
    if (errorFlag) {
        return (
            <div id="sellerCard">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://imgur.com/mCHMpLT" />
                    <Card.Body>
                        <Card.Title>{props.sellerFirstName} {props.sellerLastName}</Card.Title>

                    </Card.Body>
                </Card>
            </div>
        )
    } else {
        return (
            <div id="sellerCard">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={'http://localhost:4941/api/v1/users/'+ props.sellerId.toString() + "/image"} />
                    <Card.Body>
                        <Card.Title>{props.sellerFirstName} {props.sellerLastName}</Card.Title>

                    </Card.Body>
                </Card>
            </div>
        )
    }



}
export default SellerInfo;