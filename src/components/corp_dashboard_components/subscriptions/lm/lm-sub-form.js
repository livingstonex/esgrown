import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Spinner } from 'react-bootstrap';
import PayStackButton from '../../../ind_dashboard_components/paystack/paystackpaymentbutton';
import StaffModal from '../components/all-staff';





const LMSubForm = ({ show, onHide, closeModal }) => {

    const [user, setUser] = useState();
    const [amount, setAmount] = useState();
    const [plan, setPlan] = useState();
    const [payModal, setPayModal] = useState(false);
    const [spinner, setSpinner] = useState(false)
    const [staff, setStaff] = useState(false);
    const [staffModal, setStaffModal] = useState(false)
    const [total, setTotal] = useState();
    

    // const [state, setState] = useState({
    //     companyName: '',
    //     email: '',
    //     doi: ''
    // });

    useEffect(() => {
        const userr = JSON.parse(sessionStorage.getItem('key'));
        setUser(userr)
    }, []);

    // const handleChange = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;

    //     setState({
    //         ...state,
    //         [name]: value
    //     })
    // }

    const onChangePlan = (e) => {
        const plan = e.target.value.split('/');
        setAmount(plan[1]);
        setPlan(plan[0]);
    }

    const getStaff = () => {
        setStaffModal(true);
        closeModal();
    }

    //get total amount * number of staff and sub
    const closeStaffModal = (plantotal) => {
        setStaffModal(false);
        setTotal(plantotal);
        setPayModal(true);
        // setState()
    }


    // const subscribe = () => {
    //     const subData = {
    //         company_id: user.id,
    //         company_name: state.companyName,
    //         doi: state.doi,
    //         email: state.email,
    //         service: "RM",
    //         plan_code: plan ? plan : null
    //     }

    //     axios.post(`http://localhost:5000/corporatesubscriptions/add`, subData)
    //         .then(res => {
    //             if (res.data) {
    //                 closeModal();
    //                 setPayModal(true);
    //             }
    //         }).catch(err => console.log(err))

    // }


    //payment functions
    const close = () => {
        console.log("Payment closed");
        setPayModal(false)
    }

    const onSuccess = (res) => {
        setPayModal(false);

        const data = {
            ref: res.reference,
        }

        //make axios call an update ref and sub status
        axios.post(`http://localhost:5000/corporatesubscriptions/update/ref/${user.id}`, data)
            .then(res => alert('Your payment has been received'))
            .catch(err => console.log(err));
    }

    console.log(total);


    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header>
                    <span style={{ fontSize: '18px' }}>Corporate Subscription</span>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        {/* <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}> Company Name</label>
                                <input type="text" name="companyName" value={state.companyName} onChange={handleChange} placeholder="Company Name" className="form-control" required />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}> Official Email</label>
                                <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="Official Email" className="form-control" required />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Date of Incorporation</label>
                                <input type="date" name="doi" value={state.doi} onChange={handleChange} placeholder="Date of Incorporation" className="form-control" required />
                            </div>
                        </div> */}

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Select A Plan</label>
                                <select name="plan" className="form-control" onChange={onChangePlan} required>
                                    <option >Select a Plan</option>
                                    <option value="PLN_hwug5s75tf2rcqu/280000">3 Months Plan - 2800</option>
                                    <option value="PLN_072a7glz3tv6fzi/455000">6 Months Plan - 4550</option>
                                    <option value="PLN_wma6tld3z1g2zef/797000">1 Year Plan  - 7970 </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <button
                                type="submit"
                                className="btn font-weight-light btn-primary mt-3 py-2 w-100 border-0"
                                disabled={spinner}
                                // onClick={subscribe}
                                onClick={getStaff}

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
                email={user ? user.email:""}
                amount={total}
                plan={plan}
            />

            <StaffModal
                show={staffModal}
                onHide={() => setStaffModal(!staffModal)}
                amount={amount}
                closeStaffModal={closeStaffModal}
            />
        </>
    );
}
export default LMSubForm;