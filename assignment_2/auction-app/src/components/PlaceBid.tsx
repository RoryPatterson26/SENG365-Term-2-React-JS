import {Button, Modal} from "react-bootstrap";
import React from "react";
import axios from "axios";

const PlaceBid = (props: any) => {
    // Allows user to place bid on auction assuming the bid is valid and before auction has ended
    const [amount, setAmount] = React.useState("0");
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [placed, setPlaced] = React.useState(false)

    const handleClose = () => {setShow(false); setErrorFlag(false); setPlaced(false)}
    const handleShow = () => setShow(true);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        axios({
            method: "post",
            url: "http://localhost:4941/api/v1/auctions/"+ props.id +"/bids",
            headers: {"x-authorization": sessionStorage.getItem("token") || ''},
            data: {
                "amount": parseInt(amount)
            }
        }).then((response) => {
            setErrorFlag(false)
            setErrorMessage("")
            setPlaced(true);

        }, (error) => {
            setErrorFlag(true)
            setErrorMessage(error.toString())
        })
    }
    if (errorFlag) {
        return (
            <div>
                <Button variant="primary" onClick={handleShow}>
                    Place Bid
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <h1>Error</h1>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{color: "red"}}>
                            You can not bid on this auction
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
    if (placed) {
        return (
            <div>
                <Button variant="primary" onClick={handleShow}>
                    Place Bid
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <h1>Error</h1>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{color: "green"}}>
                            Bid Placed!!
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Place Bid
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Place Bid</Modal.Title>
                </Modal.Header>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <Modal.Body>
                        <p>Your Bid must be higher than: ${props.highestBid}</p>
                        <label htmlFor="amountInput">Bid Amount: $</label>
                        <input type="text"
                               pattern="[0-9]*"
                               placeholder="1"
                               id="amountInput"
                               value={amount}
                               onChange={(e) =>
                                   setAmount((v) => (e.target.validity.valid ? e.target.value : v))
                               }/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type={"submit"}>Place Bid</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>

    )
}
export default PlaceBid;