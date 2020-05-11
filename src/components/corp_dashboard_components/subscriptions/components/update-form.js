import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Spinner } from 'react-bootstrap';
import PayStackButton from '../../../ind_dashboard_components/paystack/paystackpaymentbutton';
import { StylesProvider } from '@material-ui/core';




const UpdateCorp = ({ show, onHide, closeModal, service }) => {

    const [payModal, setPayModal] = useState(false);
    const [amount, setAmount] = useState();
    const [spinner, setSpinner] = useState(true)
    const [plan, setPlan] = useState();
    const [updateData, setUpdateData] = useState([])
    const [email, setEmail] = useState()
    const [user, setUser] = useState();


    useEffect(() => {

        const user = JSON.parse(sessionStorage.getItem('key'));
        setUser(user)


        axios.get(`http://localhost:5000/corporatesubscriptions/${user.id}`)
            .then(res => {
                if (res.data.length > 0) {
                    const data = res.data.filter(r => {
                        return r.service === service;
                    })

                    setEmail(data[0].email)
                    setUpdateData(data);
                    setSpinner(false)

                }

            }).catch(err => console.log(err))
    }, [service]);



    const handleChange = (e) => {
        const value = e.target.value;

        setEmail(value)
    };

    const onChangePlan = (e) => {
        const plan = e.target.value.split('/');
        setAmount(plan[1]);
        setPlan(plan[0]);
    }

    const update = () => {
        setSpinner(true);
        const data = {
            email: email,
        }

        axios.post(`http://localhost:5000/corporatesubscriptions/update/email/${user.id}`, data)
            .then(res => {
                alert(res.data);
                setSpinner(false)
                closeModal()
            })
            .catch(err => console.log(err));

    }

    const makePmt = () => {
        setPayModal(true)
        closeModal();
    }

    const close = () => {
        console.log("Payment modal closed");
        setPayModal(false)
    }

    const onSuccess = (res) => {
        setPayModal(false);
        const userr = JSON.parse(sessionStorage.getItem('key'));

        const data = {
            ref: res.reference,
        }

        //make axios call an update ref and sub status
        axios.post(`http://localhost:5000/corporatesubscriptions/update/ref/${userr.id}`, data)
            .then(res => alert('Your payment has been received'))
            .catch(err => console.log(err));
    }




    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                {updateData.length > 0 ?
                    <>
                        <Modal.Header>
                            <span style={{ fontSize: '18px' }}>Update Corporate Subscription</span>
                            {
                                updateData[0].sub_status ? <button className="btn btn-default mt-3 py-2 border-0" disabled style={{ background: '#97ba0d', color: 'white' }}>PAID</button> :
                                    <button className="btn btn-default mt-3 py-2 border-0" style={{ background: '#E68722', color: 'white' }} onClick={makePmt}>PAY</button>
                            }
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container">
                                <div className="row mt-3">
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }}> Company Name</label>
                                        <input type="text" name="companyName" disabled value={updateData[0].company_name} placeholder="Company Name" className="form-control" required />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }}> Official Email</label>
                                        <input type="email" name="email" value={email} onChange={handleChange} placeholder="Official Email" className="form-control" required />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }}>Service</label>
                                        <input type="text" name="service" disabled value={updateData[0].service} placeholder="Date of Incorporation" className="form-control" required />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }}>Date of Incorporation</label>
                                        <input type="text" name="doi" disabled value={
                                            updateData[0].doi.split('T')[0]
                                        } placeholder="Date of Incorporation" className="form-control" required />
                                    </div>
                                </div>

                                {
                                    updateData[0].sub_status ? "" :
                                        <div className="row mt-3">
                                            <div className="col">
                                                <label style={{ fontWeight: 'bold' }}> Plan</label>
                                                <select name="plan" className="form-control" onChange={onChangePlan} required>
                                                    <option >Select a Plan</option>
                                                    <option value="PLN_hwug5s75tf2rcqu/280000">3 Months Plan</option>
                                                    <option value="PLN_072a7glz3tv6fzi/455000">6 Months Plan</option>
                                                    <option value="PLN_wma6tld3z1g2zef/797000">1 Year Plan</option>
                                                </select>
                                            </div>
                                        </div>
                                }
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <button
                                        type="submit"
                                        className="btn font-weight-light btn-primary mt-3 py-2 w-100 border-0"
                                        disabled={spinner}
                                        onClick={update}
                                    >
                                        {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : "Update"}
                                    </button>
                                </div>
                            </div>
                        </Modal.Body>
                    </> : <Spinner animation="grow" />
                }
            </Modal>

            <PayStackButton
                show={payModal}
                onHide={() => setPayModal(false)}
                close={close}
                callback={onSuccess}
                email={spinner ? "" : updateData.email}
                amount={amount}
                plan={plan}
            />
        </>
    );
}
export default UpdateCorp;