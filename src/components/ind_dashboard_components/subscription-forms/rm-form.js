import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Spinner } from 'react-bootstrap/';
import axios from 'axios';


export default function Form(props){
    const [modalShow, setModalShow] = useState(false);
    const [HLE, setHLE] = useState("");
    const [FT, setFT] = useState("");
    const [spinner, setSpinner] = useState(false);

    const onChangeHLE = (e) => {
        setHLE(e.target.value);
    }

    const onChangeFT = (e) => {
        setFT(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const SubObject = {
            user_id: props.user.id,
            sub_status: false,
            user_name: props.user.name,
            user_email: props.user.email,
            user_status: props.user.status,
            highest_level_of_education: HLE,
            field_of_training: FT
        }

         
        console.log(SubObject);

        try {
            setSpinner(true);
            axios.post('http://localhost:5000/subscriptionrm/add', SubObject)
                    .then((res) => {
                        console.log(res.data);
                        setSpinner(false);
                        setModalShow(false);
                    })
                    .catch(err => {
                        console.log('Err: ' + err);
                        setSpinner(false);
                        setModalShow(false);
                    });

        } catch (error) {
            console.log(error);
            setSpinner(false);
            setModalShow(false);
        }

    }


    return (
        <React.Fragment>
            <div className="ml-auto d-flex align-items-center"> 
                <React.Fragment>
                    <button className="btn btn-info btn-sm" onClick={() => setModalShow(true)}>Subscribe</button>
                </React.Fragment>
                
        </div>
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            aria-labelledby="example-custom-modal-styling-title"
            centered
                >
                    <Modal.Body>
                        <form className="container py-4" onSubmit={onSubmit}>
                            <div className="row">
                                <div className="col">
                                    <h6>Subscription Details</h6>
                                </div>
                            </div>
                            {/* Highest Level of Education */}
                            <div className="row mt-3">
                                <div className="col">
                                    <input
                                        label="Highest Level of Education"
                                        type="text"
                                        value={HLE}
                                        onChange={onChangeHLE} 
                                        placeholder='Highest Level of Education'
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            {/* Field of Training */}
                            <div className="row mt-3">
                                <div className="col">
                                    <select className="form-control" onChange={onChangeFT}>
                                        <option> Select Field of Training</option>
                                        <option value="VR">Virtual Reality</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Medicine">Medicine</option>
                                        <option value="AI">Artificial Intelligence</option>
                                        <option value="Robotics">Robotics</option>
                                    </select>
                                </div>
                            </div>

                            {/* submit button */}
                            <div className="row mt-3">
                                <div className="col">
                                    <button
                                        type="submit"
                                        className="btn font-weight-light btn-primary mt-3 py-2 w-100 border-0"
                                        disabled={spinner}
                                    >Proceed {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/> : ""} </button>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
        
        </React.Fragment>
    );
}