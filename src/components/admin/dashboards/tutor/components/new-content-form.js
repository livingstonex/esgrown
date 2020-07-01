import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'




const CreateForm = (props) => {


    const [user, setUser] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const [spinner, setSpinner] = useState();
    const [formState, setFormState] = useState({
        title: '',
        content: ''
    })


    useEffect(() => {
        const admin = JSON.parse(sessionStorage.getItem("key"));
        setUser(admin)


    }, []);


    const selectImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = function () {
            setSelectedFile(reader.result)
        }
        reader.readAsDataURL(file);
    }

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        setSpinner(true);
        const data = {
            tutor_id: user.id,
            subject: props.title,
            title: formState.title,
            content: formState.content,
            media: selectedFile
        }

        const subject = props.title.toLowerCase();
        const level = user.tutor_level.toLowerCase();

        axios.post(`http://ec2-18-188-101-36.us-east-2.compute.amazonaws.com:5000/${level}/${subject}/add`, data)
            .then(res => {
                if (res.data) {
                    alert('content created successfully');
                    setSpinner(false);
                }
            })
            .catch(err => console.log(err));


    }


    return (
        <>
            <div className="d-flex justify-content-around">
                <Card className="col col-lg-6 col-sm-6" style={{ background: '#E9E9E9' }}>
                    <CardHeader title={`${props.title} Content`} />
                    <CardContent>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Title</label>
                                <input type="text" name="title" value={formState.title} onChange={handleChange} placeholder="content title" className="form-control text-small" required />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Image/Video</label>
                                <input type="file" name="media" onChange={selectImage} accept="image/*,video/*" className="form-control text-small" required />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Content</label>
                                <textarea name="content" rows="10" value={formState.content} onChange={handleChange} className="form-control text-small" placeholder="content" required></textarea>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <button
                                    className="btn  mt-3 py-2 w-100 border-0"
                                    style={{ background: '#21A5E7', color: 'white' }}
                                    onClick={handleSubmit}
                                >
                                    {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : "Create!"}
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </>
    );
}
export default CreateForm;