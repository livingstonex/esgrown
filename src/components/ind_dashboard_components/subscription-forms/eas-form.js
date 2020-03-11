import React, { useState, useEffect, Fragment } from 'react';
import PayStackButton from '../paystack/paystackpaymentbutton';
import { Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';



export default function Form(props) {

    const [modalShow, setModalShow] = useState(false);
    const [modalPayShow, setModalPayShow] = useState(false);
    const [LOE, setLOE] = useState("");
    const [FIS, setFIS] = useState("");
    const [TIC, setTIC] = useState("");
    const [ticDisable, setTicDisable] = useState(true);
    const [useremail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [subStatus, setSubStatus] = useState(false);


    const [subPlan, setSubPlan] = useState("");
    const [amount, setAmount] = useState("");
    const [button, setButton] = useState(0)

    //SPINNER STATE
    const [spinner, setSpinner] = useState(false);

    //GET LOGGEDIN USER CREDENTIALS FOR PMT
    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('key'));
        const userEmail = userData.email;
        const userId = userData.id;
        setUserEmail(userEmail);
        setUserId(userId);

        //get sub status for user
        axios.get(`http://localhost:5000/subscriptioneas/${userData.id}`)
            .then(res => {
                if (res.data[0].ref != null) {
                    setSubStatus(res.data[0].sub_status);
                    setButton(1);
                } else {
                    setButton(2);
                }
            })
            .catch(err => console.log(err))

    }, [])


    const onChangeLOE = (e) => {
        setLOE(e.target.value);

    }

    const onChangeFIS = (e) => {
        setFIS(e.target.value);
    }

    const onRefferalChange = (e) => {
        if (e.target.value == "yes") {
            setTicDisable(false);
        } else if (e.target.value == "no") {
            setTicDisable(true);
        }

    }

    const onChangeTIC = (e) => {
        setTIC(e.target.value);
    }

    const onChangePlan = (e) => {
        const plan = e.target.value.split('/');
        setAmount(plan[1]);
        setSubPlan(plan[0]);
    }


    const onSubmit = (e) => {
        e.preventDefault();

        const SubObject = {
            user_id: props.user.id,
            sub_status: false,
            user_email: props.user.email,
            user_name: props.user.name,
            user_status: props.user.status,
            levelofeducation: LOE,
            field_of_intended_study: FIS,
            tic: TIC
        }
        try {
            setSpinner(true);
            axios.post('http://localhost:5000/subscriptioneas/add', SubObject)
                .then((res) => {
                    console.log(res.data);
                    setSpinner(false);
                    setModalShow(false);
                    setModalPayShow(true);
                })
                .catch((err) => {
                    console.log('Err: ' + err);
                    setSpinner(false);
                    setModalShow(false);
                });

        } catch (error) {
            console.log(error);
        }
    }


    //Paystack Functions
    const onSuccess = (res) => {
        console.log(res);
        setModalPayShow(false);

        const data = {
            ref: res.reference,
            sub_status: true,
            plan_code: subPlan
        }
        //make axios call to update user reference
        axios.post(`http://localhost:5000/subscriptioneas/update/easref/${userId}`, data)
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
                    {(button === 1) ? <button className="btn btn-info btn-sm" disabled style={{ color: 'white', background: '#97ba0d', border: '#97ba0d' }}>Subscribed</button> : (button === 2) ? <button className="btn btn-info btn-sm" onClick={() => setModalShow(true)}>Subscribe</button> : ""}
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
                        {/* Level of Education */}
                        <div className="row mt-3">
                            <div className="col">
                                <select className="form-control" required onChange={onChangeLOE}>
                                    <option>Level of Education</option>
                                    <option value="degree">Degree</option>
                                    <option value="masters">Masters</option>
                                    <option value="phd">Ph.D</option>
                                </select>
                            </div>
                        </div>

                        {/* Intended Study field */}
                        <div className="row mt-3">
                            <div className="col">
                                <input
                                    label=""
                                    type="text"
                                    value={FIS}
                                    onChange={onChangeFIS}
                                    placeholder="Field of Intended Study"
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <select className="form-control" required onChange={onChangePlan}>
                                    <option>Select Subscription Plan</option>
                                    <option value="PLN_euav5svesnpj2ct/515000">Annual(One Year)</option>
                                </select>
                            </div>
                        </div>


                        <div className="row mt-3">
                            <div className="col">
                                <select className="form-control" onChange={onRefferalChange}>
                                    <option>Where you refered by a Teacher?</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>

                        {/* Tic field */}
                        <div className="row mt-3">
                            <div className="col">
                                <input
                                    label=""
                                    type="text"
                                    disabled={ticDisable}
                                    value={TIC}
                                    onChange={onChangeTIC}
                                    placeholder={ticDisable ? "No Worries, TIC is Optional" : "Please enter Teacher's Identification Code"}
                                    className="form-control"

                                />
                            </div>
                        </div>

                        {/* submit button */}
                        <div className="row mt-3">
                            <div className="col">
                                <button
                                    type="submit"
                                    className="btn font-weight-light btn-primary mt-3 py-2 w-100 border-0"
                                    disabled={spinner}
                                >
                                    Proceed {spinner ?
                                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : ""}
                                </button>
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
