import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import toast from '../../../../util/toast';




const StaffRating = ({ show, onHide, details, closeModal }) => {

    const [rating, setRating] = useState();
    const [user, setUser] = useState();


    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        setUser(user)

    }, []);

    const rate = event => {
        setRating({ ...rating, [event.target.name]: event.target.value });
    };

    const submitRating = async () => {

        const data = {
            org: user.name,
            staff_ratings: {
                staff_id: details._id,
                staff_name: details.fullname,
                staff_email: details.email,
                staff_phone: details.phone,
                civility: rating.civility,
                professionalism: rating.professionalism,
                performance: rating.performance
            }
        }

        try {
            const res = await axios.post(`http://13.59.192.18/api/rate/staff/add`, data);

            console.log(res.data);
            toast(res.data, 'success')
            closeModal()

        } catch (e) {
            console.log(e)
            toast("there was an error rating your staff, please try again", 'warn');
            closeModal()
        }

    }


    return (
        <>
            <Modal show={show} onHide={onHide} centered style={{ marginTop: '50px' }}>

                <Modal.Body>
                    <div className="container" style={{ background: '#e9ecef' }} >
                        <div style={{ padding: '30px' }}>

                            <div className="row mt-3">
                                <div className="row">
                                    <label className="col mt-2" style={{ fontWeight: 'bold' }}>Staff Name</label>
                                    <input type="text" disabled value={details.fullname} className="form-control plaintext col" style={{ borderStyle: 'none' }} />
                                </div>
                            </div>
                            <hr />

                            <div className="container">
                                <div className="d-flex justify-content-around">
                                    <p className="mt-3" style={{ textAlign: 'justify' }}>Performance:</p>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">1</p> <input type="radio" onChange={rate} name="psr" value="1" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">2</p> <input type="radio" onChange={rate} name="performance" value="2" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">3</p> <input type="radio" onChange={rate} name="performance" value="3" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">4</p> <input type="radio" onChange={rate} name="performance" value="4" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">5</p> <input type="radio" onChange={rate} name="performance" value="5" />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="container">
                                <div className="d-flex justify-content-around">
                                    <p className="mt-3" style={{ textAlign: 'justify' }}>Professionalism:</p>
                                    <div className="col">
                                        <div className="d-flex d-flex align-items-center">
                                            <p className="mt-3 mr-2">1</p> <input type="radio" onChange={rate} name="professionalism" value="1" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">2</p> <input type="radio" onChange={rate} name="professionalism" value="2" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">3</p> <input type="radio" onChange={rate} name="professionalism" value="3" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">4</p> <input type="radio" onChange={rate} name="professionalism" value="4" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">5</p> <input type="radio" onChange={rate} name="professionalism" value="5" />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="container">
                                <div className="d-flex justify-content-around justify-content-start">
                                    <p className="mt-3" style={{ textAlign: 'justify' }}>Civility:</p>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">1</p> <input type="radio" onChange={rate} name="civility" value="1" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">2</p> <input type="radio" onChange={rate} name="civility" value="2" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">3</p> <input type="radio" onChange={rate} name="civility" value="3" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">4</p> <input type="radio" onChange={rate} name="civility" value="4" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <p className="mt-3 mr-2">5</p> <input type="radio" onChange={rate} name="civility" value="5" />
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
export default StaffRating;