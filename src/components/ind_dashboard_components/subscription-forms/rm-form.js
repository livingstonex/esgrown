import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Spinner } from 'react-bootstrap/';
import PayStackButton from '../paystack/paystackpaymentbutton';

import axios from 'axios';


export default function Form(props) {
    const [modalShow, setModalShow] = useState(false);
    const [HLE, setHLE] = useState("");
    const [FT, setFT] = useState("");
    const [spinner, setSpinner] = useState(false);

    const [useremail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [subStatus, setSubStatus] = useState(false);
    const [modalPayShow, setModalPayShow] = useState(false);

    const [subPlan, setSubPlan] = useState("");
    const [amount, setAmount] = useState("");


    const onChangePlan = (e) => {
        const plan = e.target.value.split('/');
        setSubPlan(plan[0]);
        setAmount(plan[1]);

        console.log(plan)
    }


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


        try {
            setSpinner(true);
            axios.post('http://localhost:5000/subscriptionrm/add', SubObject)
                .then((res) => {
                    console.log(res.data);
                    setSpinner(false);
                    setModalPayShow(true);
                    setModalShow(false);
                    setModalPayShow(true);

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

    //GET LOGGEDIN USER CREDENTIALS FOR PMT
    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('key'));
        const userEmail = userData.email;
        const userId = userData.id;
        setUserEmail(userEmail);
        setUserId(userId);

        //get sub status for user
        axios.get(`http://localhost:5000/subscriptionrm/${userData.id}`)
            .then(res => {
                if (res.data[0].ref != null) {
                    setSubStatus(res.data[0].sub_status);
                }

            })
            .catch(err => console.log(err))

    }, [])

    //Paystack Functions
    const onSuccess = (res) => {
        console.log(res);
        setModalPayShow(false);

        const data = {
            ref: res.reference,
            sub_status: true,
            plan_code: subPlan
        }

        console.log(data);
        //make axios call to update user reference
        axios.post(`http://localhost:5000/subscriptionrm/update/rmref/${userId}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err))

    }

    const close = () => {
        console.log("Payment closed");
        setModalPayShow(false)
    }


    return (
        <React.Fragment>
            <div className="ml-auto d-flex align-items-center">
                <React.Fragment>
                    {subStatus ? <button className="btn btn-info btn-sm" disabled style={{ color: 'white', background: '#97ba0d', border: '#97ba0d' }}>Subscribed</button> :
                        <button className="btn btn-info btn-sm" onClick={() => setModalShow(true)}>Subscribe</button>}
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
                                <select className="form-control" required onChange={onChangeHLE}>
                                    <option>Highest Level of Education</option>
                                    <option value="degree">Degree</option>
                                    <option value="masters">Masters</option>
                                    <option value="phd">Ph.D</option>
                                </select>
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


                        {/* Subscription Plan */}

                        <div className="row mt-3">
                            <div className="col">
                                <select className="form-control" required onChange={onChangePlan}>
                                    <option>Select Subscription Plan</option>
                                    <option value="PLN_txgxcy2nqdqofkd/460000">Biannual (six Months)</option>
                                    <option value="PLN_d14bmlqitn9yce4/785000">Annual (one Year)</option>
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
                                >Proceed {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : ""} </button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <PayStackButton
                show={modalPayShow}
                onHide={() => setModalPayShow(false)}
                close={close}
                callback={onSuccess}
                email={useremail}
                amount={amount}
                plan={subPlan}
            />

        </React.Fragment>
    );
}