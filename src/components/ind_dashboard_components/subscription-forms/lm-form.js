import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Spinner } from 'react-bootstrap/';
import PayStackButton from '../paystack/paystackpaymentbutton';
import axios from 'axios';


export default function Form(props) {

    const [modalShow, setModalShow] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [HLE, setHLE] = useState("");
    const [NOWP, setNOWP] = useState("");

    const [subPlan, setSubPlan] = useState("");
    const [amount, setAmount] = useState("");
    const [modalPayShow, setModalPayShow] = useState(false);
    const [useremail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [subStatus, setSubStatus] = useState(false);
    const [button, setButton] = useState(0)




    const onChangeHLE = (e) => {
        setHLE(e.target.value);
    }

    const onChangeNOWP = (e) => {
        setNOWP(e.target.value);
    }

    const onChangePlan = (e) => {
        const plan = e.target.value.split('/');
        setSubPlan(plan[0]);
        setAmount(plan[1]);
        console.log(plan)
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
            nature_of_work_business: NOWP
        }

        try {
            setSpinner(true);
            axios.post('http://172.31.25.52/subscriptionlm/add', SubObject)
                .then((res) => {
                    console.log(res.data);
                    setSpinner(false);
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
        // axios.get(`http://172.31.25.52/subscriptionlm/${userData.id}`)
        //     .then(res => {
        //         if (res.data[0].ref != null) {
        //             // setSubStatus(res.data[0].sub_status);
        //             setButton(1);
        //         } else {
        //             setButton(2);
        //         }
        //     })
        //     .catch(err => console.log(err))
        if (userData.sub_status_lm === 'active') {

            setSubStatus(userData.sub_status_lm);
            setButton(1);

        } else {
            setButton(2);
        }

    }, [])

    //Paystack Functions
    const onSuccess = (res) => {
        console.log(res);
        setModalPayShow(false);

        //make a call to https://api.paystack.co/subscription and get all subscription 
        //and filter for email of current subscription and extract subscription code.
        //update individual doc with the gotten data.

        axios.get(`https://api.paystack.co/subscription`, { headers: { "Authorization": "Bearer sk_test_19f4c12e4e018a9f742e1723d42c9c8e509800b4" } })
            .then(res => {
                const client = res.data.data.filter(st => {
                    return st.customer.email === useremail
                })

                const data = {
                    ref: res.reference,
                    sub_status: client[0].status,
                    sub_code: client[0].subscription_code
                }

                //update eas substatus
                axios.post(`http://172.31.25.52/subscriptionlm/update/lmref/${userId}`, data)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))


                //update user details
                axios.post(`http://172.31.25.52/individuals/update/substatus/${userId}`, { sub_status_lm: client[0].status, })
                    .then(res => {
                        const globalUser = JSON.parse(sessionStorage.getItem('key'));

                        globalUser.sub_status_lm = client[0].status;

                        sessionStorage.setItem('key', JSON.stringify(globalUser));
                        setButton(1)

                    }).catch(err => console.log(err))

            }).catch(err => console.log(err));


    }

    const close = () => {
        console.log("Payment closed");
        setModalPayShow(false)
    }
    return (
        <React.Fragment>
            <div className="ml-auto d-flex align-items-center">
                <React.Fragment>
                    {(button === 1) ? <button className="btn btn-info btn-sm" disabled style={{ color: 'white', background: '#97ba0d', border: '#97ba0d' }}>Subscribed</button> : (button === 2) ? <button className="btn btn-info btn-sm" onClick={() => setModalShow(true)}>Subscribe</button> : <button className="btn btn-info btn-sm" onClick={() => setModalShow(true)}>Subscribe</button>}
                </React.Fragment>

            </div>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                aria-labelledby="example-custom-modal-styling-title"
                centered
            >
                <Modal.Body>
                    <form className="container py-4" onSubmit={onSubmit} >
                        <div className="row">
                            <div className="col">
                                <h6>Subscription Details</h6>
                            </div>
                        </div>
                        {/* Level of Education */}
                        <div className="row mt-3">
                            <div className="col">
                                <select className="form-control" required onChange={onChangeHLE}>
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
                                <textarea value={NOWP} onChange={onChangeNOWP} rows='7' className="form-control" required placeholder="Nature of Work or Business">

                                </textarea>
                            </div>
                        </div>
                        {/* Subscription Plan */}

                        <div className="row mt-3">
                            <div className="col">
                                <select className="form-control" required onChange={onChangePlan}>
                                    <option>Select Subscription Plan</option>
                                    <option value="PLN_hwug5s75tf2rcqu/289000">Quarterly (three Months)</option>
                                    <option value="PLN_072a7glz3tv6fzi/455000">Biannual (six Months)</option>
                                    <option value="PLN_wma6tld3z1g2zef/797000">Annual (one Year)</option>
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
                                >Proceed  {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : ""}
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