import React from "react";
import axios from "axios";


const ImageUploader = (props: any) => {
    const [image, setImage] = React.useState<any>();
    const [success, setSuccess] = React.useState(false);
    const [contentType, setContentType] = React.useState('')

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.files![0] )
        setContentType(e.target.files![0].type)
    };

    const handleUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        axios({
            method: "put",
            url: "http://localhost:4941/api/v1/" + (props.type) + "/" + (props.userAuctionId) + "/image",
            headers: {"x-authorization": sessionStorage.getItem("token") || '', "Content-Type": contentType},
            data: image
        }).then(response => {
            setSuccess(true);
        }).catch(err => {
            alert(err.message);
        });
    }

    return (
        <div id="imageUpload">
            <p className="title">Select Image:</p>
            <div style={{ marginBottom: 10 }}>
                <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={(e) => onImageChange(e)} />
            </div>
            {!success ? <button className="btn btn-primary" onClick={(e) => handleUpload(e)}>Upload Image</button> : <p>Image successfully uploaded</p>}
        </div>
    )
}

export default ImageUploader;