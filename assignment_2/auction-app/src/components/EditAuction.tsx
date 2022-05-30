import React, {useState} from "react";
import axios from "axios";
import {Button, Modal} from "react-bootstrap";
import ImageUploader from "./ImageUploader";

const EditAuction = (props: any) => {
    const [show, setShow] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [categories, setCategories] = React.useState([{categoryId: 0, name: "unavailable"}]);
    const [reserve, setReserve] = React.useState('1')
    const [chosenCategory, setChosenCategory] = React.useState("1");
    const [endDate, setEndDate] = React.useState('');
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getCategories = () => {
        axios({
                method: "get",
                url: "http://localhost:4941/api/v1/auctions/categories"
            }
        ).then((response) => {
            setCategories(response.data)

        }, (error) => {

        })
    }
    React.useEffect(() => {
        getCategories()
    }, [])

    const categorySelect = () => {
        return categories.map((item: category) =>
            <option key={item.categoryId} value={item.categoryId} selected={item.categoryId === 1}>{item.name}</option>
        )
    };

    const editContents = () => {
        let thing: any = {};
        if (title.length > 0) {
            thing["title"] = title;
        }
        if (description.length > 0) {
            thing["description"] = description;
        }
        if (reserve.length > 0) {
            thing["reserve"] = reserve;
        }
        if (endDate.length > 0) {
            thing["endDate"] = endDate
        }
        if (chosenCategory) {
            thing["category"] = parseInt(chosenCategory)
        }
        return thing;
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleClose()
        editContents()
        axios({
            method: "patch",
            url: "http://localhost:4941/api/v1/auctions/" + props.auctionId,
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
                Edit Auction
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Auction</Modal.Title>
                </Modal.Header>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Modal.Body>
                        <ImageUploader type={"auctions"} userAuctionId={props.auctionId} />
                            <div className="form-group" id="titleDiv">
                                <label htmlFor="createTitle">Auction title:</label>
                                <input type="text" id="createTitle" placeholder="Title..."
                                       onChange={(e) => setTitle(e.target.value)}
                                       value={title} />
                            </div>
                            <div className="form-group" id="descriptionDiv">
                                <label htmlFor="createDescription">Auction description:</label>
                                <input type="text" id="createDescription" placeholder="Description..."
                                       onChange={(e) => setDescription(e.target.value)}
                                       value={description} />
                            </div>
                            <div className="form-group" id="endDateDiv">
                                <label htmlFor="createEndDate">Auction close date: </label>
                                <input type="datetime-local" id="createEndDate" min={(new Date()).toString()}  value={endDate}
                                       onChange={(e) => setEndDate(e.target.value)}/>
                            </div>
                            <div id="categoryDiv" className="form-group">
                                <label htmlFor="selectCategory">Category: &nbsp; </label>
                                <select id="categorySelect" onChange={(e) => setChosenCategory(e.target.value)}>
                                    {categorySelect()}
                                </select>
                            </div>
                            <div className="form-group" id="endDateDiv">
                                <label htmlFor="createReserve">Reserve: $</label>
                                {/* Setting min value as well as assuming reserve can only be a whole number */}
                                <input type="text"
                                       pattern="[0-9]*"
                                       placeholder="1"
                                       value={reserve}
                                       onChange={(e) =>
                                           setReserve((v) => (e.target.validity.valid ? e.target.value : v))
                                       }/>
                            </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div id="submitAuction">
                            <button type="submit" className="btn btn-primary">Edit Auction</button>
                        </div>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}
export default EditAuction;