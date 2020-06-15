import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import PayStackButton from '../paystack/paystackpaymentbutton';
import { Modal } from 'react-bootstrap/';


export default function Form(props) {

    const [modalShow, setModalShow] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [LOE, setLOE] = useState("");
    const [NIEL, setNIEL] = useState("");
    const [FIS, setFIS] = useState("");
    const [TIC, setTIC] = useState("");
    const [ticDisable, setTicDisable] = useState(true);

    const [useremail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [subStatus, setSubStatus] = useState(false);
    const [modalPayShow, setModalPayShow] = useState(false);

    const [subPlan, setSubPlan] = useState("");
    const [amount, setAmount] = useState("")
    const [button, setButton] = useState(0)





    //GET LOGGEDIN USER CREDENTIALS FOR PMT
    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('key'));
        const userEmail = userData.email;
        const userId = userData.id;
        setUserEmail(userEmail);
        setUserId(userId);

        //get sub status for user
        // axios.get(`http://localhost:5000/subscriptionefa/${userData.id}`)
        //     .then(res => {
        //         if (res.data[0].ref != null) {
        //             // setSubStatus(res.data[0].sub_status);
        //             setButton(1);
        //         }else{
        //             setButton(2);
        //         }

        //     })
        //     .catch(err => console.log(err))

        if (userData.sub_status_efa === 'active') {

            setSubStatus(userData.sub_status_efa);
            setButton(1);

        } else {
            setButton(2);
        }

    }, [])



    const onChangeLOE = (e) => {
        setLOE(e.target.value);
    }

    const onChangeNIEL = (e) => {
        setNIEL(e.target.value);
    }

    const onRefferalChange = (e) => {
        if (e.target.value == "yes") {
            setTicDisable(false);
        } else if (e.target.value == "no") {
            setTicDisable(true);
            setTIC("");
        }
    }

    const onChangeFIS = (e) => {
        setFIS(e.target.value);
    }

    const onChangeTIC = (e) => {
        setTIC(e.target.value);
    }

    const onChangePlan = (e) => {
        const plan = e.target.value.split('/');
        setSubPlan(plan[0]);
        setAmount(plan[1]);
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
            next_intended_education_level: NIEL,
            field_of_intended_study: FIS,
            tic: TIC
        }
        //console.log(SubObject);
        try {
            setSpinner(true);
            axios.post('http://localhost:5000/subscriptionefa/add', SubObject)
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
                axios.post(`http://localhost:5000/subscriptionefa/update/efaref/${userId}`, data)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))


                //update user details
                axios.post(`http://localhost:5000/individuals/update/substatus/${userId}`, { sub_status_efa: client[0].status,})
                    .then(res => {
                        const globalUser = JSON.parse(sessionStorage.getItem('key'));

                        globalUser.sub_status_efa = client[0].status;

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

                        {/* Next intended education level field */}
                        <div className="row mt-3">
                            <div className="col">
                                <select className="form-control" required onChange={onChangeNIEL}>
                                    <option>Next Intended Education Level</option>
                                    <option value="secondary school">Secondary School</option>
                                    <option value="undergraduate">Undergraduate</option>
                                    <option value="masters">Masters</option>
                                    <option value="phd">Ph.D</option>
                                </select>
                            </div>
                        </div>

                        {/* Field of Intended Study */}
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
                                    <option value="PLN_gkcu1vni2vwc56h/524000">Annual(One Year)</option>
                                    <option value="PLN_7b0a3p1r8im1xb8/279000">Biannual(6 Months)</option>
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
                                    placeholder="TIC"
                                    className="form-control"

                                />
                            </div>
                        </div>

                        {/* submit button */}
                        <div className="row mt-3">
                            <div className="col">
                                <button
                                    type="submit"
                                    disabled={spinner}
                                    className="btn font-weight-light btn-primary mt-3 py-2 w-100 border-0"
                                // disabled={null}
                                >Proceed</button>
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