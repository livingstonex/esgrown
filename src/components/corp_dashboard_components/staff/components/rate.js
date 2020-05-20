import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Modal, Form, Col, Row } from 'react-bootstrap';
import toast from '../../../../util/toast';


const Rate = ({ show, onHide, details, closeModal, weeks, lastDoc }) => {

    const [user, setUser] = useState();
    const [rating, setRating] = useState();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        setUser(user)
        
    }, []);

    const rate = event => {
        setRating({ ...rating, [event.target.name]: event.target.value });
    };


    const submitRating = () => {

        const personnel = user.org_type === "school" ? "teacher" : "staff";

        const data = {
            org: user.name,
            total_weeks: lastDoc ? lastDoc.total_weeks : weeks ,
            ratings: {
                name: details.fullname,
                personnel_id: details._id,
                phone: details.phone,
                pedagogy: rating.pedagogy,
                class_control: rating.class_control,
                p_s_relationship: rating.psr,
                tic: details.tic
            }
        }

        axios.post(`http://localhost:5000/rate/${personnel}/add`, data)
            .then(res => {
                if (res.data === 1) {
                    toast(`${personnel} has already been rated for the week`, "warn");
                } else {
                    toast(`${personnel} rating successful`, "success");
                }
                
                closeModal();
            })
            .catch(err => toast(err, "error"))


    }
    console.log(details)

    return (
        <>
            <Modal show={show} onHide={onHide} centered style={{ marginTop: '50px' }}>

                <Modal.Body>
                    <div className="container" style={{ background: '#e9ecef' }} >
                        <div style={{ padding: '30px' }}>

                            <div className="row mt-3">
                                <div className="row">
                                    <label className="col mt-2" style={{ fontWeight: 'bold' }}>{user && user.org_type === "school" ? "Teacher" : "Staff"} Name</label>
                                    <input type="text" disabled value={details.fullname} className="form-control plaintext col" style={{ borderStyle: 'none' }} />
                                </div>
                            </div>
                            <hr />

                            <div className="container">
                                <div className="d-flex justify-content-evenly">
                                    <p className="mt-3 mr-3">Pedagogy:</p>
                                    <div className="col">
                                        <div className="d-flex d-flex align-items-center">
                                            <p className="mt-3 mr-2">1</p> <input type="radio" onChange={rate} name="pedagogy" value="1" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">2</p> <input type="radio" onChange={rate} name="pedagogy" value="2" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">3</p> <input type="radio" onChange={rate} name="pedagogy" value="3" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">4</p> <input type="radio" onChange={rate} name="pedagogy" value="4" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">5</p> <input type="radio" onChange={rate} name="pedagogy" value="5" />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="container">
                                <div className="d-flex justify-content-evenly">
                                    <p>Class Control:</p>
                                    <div className="col">
                                        <div className="d-flex d-flex align-items-center">
                                            <p className="mt-3 mr-2">1</p> <input type="radio" onChange={rate} name="class_control" value="1" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">2</p> <input type="radio" onChange={rate} name="class_control" value="2" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">3</p> <input type="radio" onChange={rate} name="class_control" value="3" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">4</p> <input type="radio" onChange={rate} name="class_control" value="4" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">5</p> <input type="radio" onChange={rate} name="class_control" value="5" />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="container">
                                <div className="d-flex justify-content-evenly">
                                    <p>Pupil Student Relations:</p>
                                    <div className="col">
                                        <div className="d-flex d-flex align-items-center">
                                            <p className="mt-3 mr-2">1</p> <input type="radio" onChange={rate} name="psr" value="1" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">2</p> <input type="radio" onChange={rate} name="psr" value="2" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">3</p> <input type="radio" onChange={rate} name="psr" value="3" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">4</p> <input type="radio" onChange={rate} name="psr" value="4" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">5</p> <input type="radio" onChange={rate} name="psr" value="5" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal.Footer style={{ background: '#e9ecef' }}>

                        <button
                            className="btn mt-3 w-100 border-0"
                            style={{ background: '#21A5E7', color: 'white' }}
                            onClick={submitRating}
                        >
                            Submit Rating
                        </button>

                    </Modal.Footer>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default Rate;