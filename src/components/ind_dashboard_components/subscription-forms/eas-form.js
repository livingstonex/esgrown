import React, { useState, useEffect, Fragment } from 'react';
import PaystackButton from 'react-paystack';
import { Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';



export default function Form(props) {

    const [modalShow, setModalShow] = useState(false);
    const [modalPayShow, setModalPayShow] = useState(false);
    const [LOE, setLOE] = useState("");
    const [FIS, setFIS] = useState("");
    const [TIC, setTIC] = useState("");
    const [ticDisable, setTicDisable] = useState(true);

    //SPINNER STATE
    const [spinner, setSpinner] = useState(false);

    //GET LOGGEDIN USER CREDENTIALS FOR PMT
    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('key'));
        const userEmail = userData.email;
        const username = userData.username;
        setUserEmail(userEmail);
        setUserName(username);
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

    const close = () => {
        console.log("Payment closed");
    }

    const callback = (response) => {
        console.log(response);
        setPmtModalShow(false);

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
    const callback = (response) => {
        console.log(response); // card charged successfully, get reference here
    }

    const close = () => {
        console.log("Payment closed");
    }

    //console.log(props.user);
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



            {/* Payment modal */}

            <Modal
                show={modalPayShow}
                onHide={() => setModalPayShow(false)}
                aria-labelledby="example-custom-modal-styling-title"
                centered
            >
<<<<<<< HEAD
                <Modal.Body style={{ width: 'auto', background: '#21a5e7' }}>
                    <PaystackButton
                        text="Proceed To Payment"
                        class="pay-btn"
                        close={close}
                        embed={false}
                        callback={callback}
                        email={userEmail}
                        amount="515000"
                        paystackkey='pk_test_7b545e0d7a1aaa0e39782e7d5aa7e9595a8082fc'
                        tag="button"
                    />
                </Modal.Body>
=======
                <Modal.Body >
                    <div className="row d-flex justify-content-center">
                        <div className="col"></div>
                        <div className="col mt-2 justify-content-center">
                                <PaystackButton 
                                        text="Make Subscription Payment"
                                        className="pay-butt"
                                        callback={callback}
                                        close={close}
                                        disabled={false} 
                                        email="test@gmail.com"
                                        amount="515000"
                                        paystackkey="pk_test_7b545e0d7a1aaa0e39782e7d5aa7e9595a8082fc" 
                                    />
                        </div>
                        <div className="col"></div>
                    </div>
                        
                    
                </Modal.Body>
            </Modal>
           
>>>>>>> 3aea7a84d5e7cf50026e50889c9f41ba3c3cd97d


            </Modal>
            
        </React.Fragment>
    );
}
