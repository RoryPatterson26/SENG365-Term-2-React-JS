import axios from "axios";
import React from "react";
import {Button, Modal, ModalBody} from "react-bootstrap";

const DeleteAuction = (props: any) => {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = React.useState(false);

    const deleteAuction = () => {
        handleClose()
        axios({
                method: "delete",
                url: "http://localhost:4941/api/v1/auctions/"+props.auctionId,
                headers: {
                    "x-authorization": sessionStorage.getItem("token") || ''
                }
            }
        ).then((response) => {


        }, (error) => {

        })
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Delete Auction
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Auction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Are you Sure you want to delete this Auction?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary" onClick={deleteAuction}>Delete Auction</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DeleteAuction;