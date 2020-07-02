import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Spinner } from 'react-bootstrap';
import PayStackButton from '../../../ind_dashboard_components/paystack/paystackpaymentbutton';
import toast from '../../../../util/toast';





const RMSubForm = ({ show, onHide, closeModal }) => {

    const [user, setUser] = useState();
    const [amount, setAmount] = useState();
    const [plan, setPlan] = useState();
    const [payModal, setPayModal] = useState(false);
    const [spinner, setSpinner] = useState(false)

    const [state, setState] = useState({
        companyName: '',
        email: '',
        doi: ''
    });

    useEffect(() => {
        const userr = JSON.parse(sessionStorage.getItem('key'));
        setUser(userr)
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setState({
            ...state,
            [name]: value
        })
    }

    const onChangePlan = (e) => {
        const plan = e.target.value.split('/');
        setAmount(plan[1]);
        setPlan(plan[0]);
    }

    const subscribe = () => {

        const subData = {
            company_id: user.id,
            company_name: user.name,
            email: user.email
        }

        // console.log(subData);
        axios.post(`http://13.59.192.18/corporatesubscriptions/add`, subData)
            .then(res => {
                if (res.data) {
                    closeModal();
                    setPayModal(true);
                }
            }).catch(err => {
                console.log(err)
            })

    }


    //payment functions
    const close = () => {
        console.log("Payment closed");
        setPayModal(false)
    }

    const onSuccess = async (response) => {
        setPayModal(false);




        axios.get(`https://api.paystack.co/subscription`, { headers: { "Authorization": "Bearer sk_test_19f4c12e4e018a9f742e1723d42c9c8e509800b4" } })
            .then(res => {
                // console.log(res.data)
                const client = res.data.data.filter(st => {
                    return st.customer.email === user.email
                })


                const data = {
                    sub_status_rm: client[0].status,
                    sub_code_rm: client[0].subscription_code,
                    ref: response.reference
                }

                axios.post(`http://13.59.192.18/corporatesubscriptions/update/ref/${user.id}`, data)
                    .then(res => {
                        let lS = JSON.parse(sessionStorage.getItem('key'));
                        lS.sub_status_rm = client[0].status;

                        sessionStorage.setItem('key', JSON.stringify(lS));
                        toast(res.data, 'success')
                        closeModal('active');
                    })
                    .catch(err => console.log(err));

                axios.post(`http://13.59.192.18/corporates/update/status/${user.id}`, data)
                    .then(res => console.log(res.data)).catch(err => console.log(err))

            })
            .catch(err => console.log(err));

    }



    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header>
                    <span style={{ fontSize: '18px' }}>Corporate Subscription</span>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}> Company Name</label>
                                <input type="text" name="companyName" value={user ? user.name : ""} onChange={handleChange} placeholder="Company Name" className="form-control" required />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}> Official Email</label>
                                <input type="email" name="email" value={user ? user.email : ""} onChange={handleChange} placeholder="Official Email" className="form-control" required />
                            </div>
                        </div>

                        {/* <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Date of Incorporation</label>
                                <input type="date" name="doi" value={user ? user.doi:""} onChange={handleChange} placeholder="Date of Incorporation" className="form-control" required />
                            </div>
                        </div> */}

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}> Plan</label>
                                <select name="plan" className="form-control" onChange={onChangePlan} required>
                                    <option >Select a Plan</option>
                                    <option value="PLN_hwug5s75tf2rcqu/280000">3 Months Plan 2800</option>
                                    <option value="PLN_072a7glz3tv6fzi/455000">6 Months Plan 4550</option>
                                    <option value="PLN_wma6tld3z1g2zef/797000">1 Year Plan   7970</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <button
                                className="btn font-weight-light btn-primary mt-3 py-2 w-100 border-0"
                                disabled={spinner}
                                onClick={subscribe}
                            >
                                {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : "Proceed"}
                            </button>
                        </div>
                    </div>

                </Modal.Body>

            </Modal>
            <PayStackButton
                show={payModal}
                onHide={() => setPayModal(false)}
                close={close}
                callback={onSuccess}
                email={user ? user.email : ""}
                amount={amount}
                plan={plan}
            />
        </>
    );
}
export default RMSubForm;