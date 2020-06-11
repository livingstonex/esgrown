import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';



const NewContent = (props) => {

    const [data, setData] = useState(
        'title',
        'content',
        'publish',
        'publish_later',
        'user_class'
    )

    const [selectedFile, setSelectedFile] = useState(null);


    const [spinner, setSpinner] = useState(false)

    const [admin, setAdmin] = useState();

    useEffect(() => {
        const admin = JSON.parse(sessionStorage.getItem("key"));

        setAdmin(admin.id)

    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({
            ...data,
            [name]: value
        })

    }



    const selectImage = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            setSelectedFile(reader.result)
        }
        reader.readAsDataURL(file);
    }


    const handleSubmit = (e) => {
        setSpinner(true)
        e.preventDefault();


        const submitData = {
            title: data.title,
            content: data.content,
            is_published: data.publish === "YES" ? true : false,
            date_to_publish: data.publish_later === undefined ? null : data.publish_later,
            media: selectedFile,
            admin_id: admin,
            user_class: data.user_class
        }


        axios.post(props.url, submitData)
            .then(res => {
                console.log(res.data)
                setSpinner(false)
                alert('new content created');
            })
            .catch(err => {
                setSpinner(false);
                alert('OOPS! :' + err)
            });

        setData({
            title: '',
            content: '',
            publish: '',
            publish_later: '',
            content: '',
            user_class: ''
        })

    }


    return (
        <>
            <Card className="col col-lg-6 col-sm-6">
                <CardContent>
                    <h6>{props.title}</h6>
                    <form className="container py-4">
                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Content Title</label>
                                <input type="text" name="title" value={data.title} onChange={handleChange} placeholder="Content Title" className="form-control" required />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Publish Now</label>
                                <select name="publish" onChange={handleChange} className="form-control" required >
                                    <option value="NO" selected>NO</option>
                                    <option value="YES">YES</option>
                                </select>
                            </div>
                        </div>


                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Publish later</label>
                                <input type="date" name="publish_later" disabled={data.publish == "YES" ? true : false} value={data.publish_later} onChange={handleChange} className="form-control" />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>User Class</label>
                                <select name="user_class" onChange={handleChange} className="form-control" required >
                                    <option value="primary">Elementary / Primary</option>
                                    <option value="secondary">Secondary / HighSchool</option>
                                    <option value="undergraduate">Undergraduate</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Image / Video</label>
                                <input type="file" name="image" onChange={selectImage} accept="image/*,video/*" className="form-control" />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Content</label>
                                <textarea name="content" onChange={handleChange} className="form-control" rows="10" placeholder="content body" >{data.content}</textarea>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <button
                                    className="btn font-weight-light mt-3 py-2 w-100 border-0"
                                    style={{ background: '#21A5E7', color: 'white' }}
                                    onClick={handleSubmit}
                                >
                                    {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : "Create"}
                                </button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );

}
export default NewContent;