import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Spinner } from 'react-bootstrap';
import PayStackButton from '../../../ind_dashboard_components/paystack/paystackpaymentbutton';
import StaffModal from '../components/all-staff';
import toast from '../../../../util/toast';





const LMSubForm = ({ show, onHide, closeModal }) => {

    const [user, setUser] = useState();
    const [amount, setAmount] = useState();
    const [plan, setPlan] = useState();
    const [payModal, setPayModal] = useState(false);
    const [spinner, setSpinner] = useState(false)
    const [staff, setStaff] = useState([]);
    const [staffModal, setStaffModal] = useState(false)
    const [total, setTotal] = useState();
    const [subPeriod, setSubPeriod] = useState();
    const [Btn, setBtn] = useState(true);


    // const [state, setState] = useState({
    //     companyName: '',
    //     email: '',
    //     doi: ''
    // });

    useEffect(() => {
        const userr = JSON.parse(sessionStorage.getItem('key'));
        setUser(userr)


        axios.get(`http://13.59.192.18/api/individuals/staff/${userr.id}`)
            .then(res => {
                const unsubscribedStaff = res.data.filter(staff => {
                    return staff.sub_status_compt_mgt === 'inactive' || staff.sub_status_compt_mgt === 'completed';
                })
                setStaff(unsubscribedStaff);
            }).catch(err => console.log(err));

    }, []);


    const onChangePlan = (e) => {
        const plan = e.target.value.split('/');
        setAmount(plan[1]);
        setPlan(plan[0]);
        if (Boolean(e.target.value)) {
            setBtn(false)
        } else {
            setBtn(true)

        }


    }

    const showStaff = () => {
        setStaffModal(true);
        closeModal();
    }

    //get total amount * number of staff and sub
    const closeStaffModal = (plantotal) => {
        setStaffModal(false);
        setTotal(plantotal);
        setPayModal(true);

    }


    //payment functions
    const close = () => {
        console.log("Payment closed");
        setPayModal(false)
    }

    const onSuccess = (res) => {
        setPayModal(false);



        const data = {
            sub_status_compt_mgt: 'active',
        }

        console.log(staff)

        //update substatus of paid staff
        staff.map(st => {
            axios.post(`http://13.59.192.18/api/individuals/update/substatus/${st._id}`, data)
                .then(res => console.log(res.data))
                .catch(err => console.log(err));

            axios.post(`http://13.59.192.18/api/competence/management/add`, {
                user_id: st._id,
                company_id: user.id,
                org_type: user.org_type,
                sub_status: 'active',
                user_name: st.fullname,
                user_email: st.email,
                start_date: Date.now(),
                end_date: (86400 * plan) + Date.now()

            }).then(res => console.log(res.data))
                .catch(err => console.log(err))
        })

        toast(`${staff.length}  subscriptions successful`, 'success');
    }




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
                                    <option value="">Select a Plan</option>
                                    <option value="90/280000">3 Months Plan - 2800</option>
                                    <option value="180/455000">6 Months Plan - 4550</option>
                                    <option value="365/797000">1 Year Plan  - 7970 </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <button
                                type="submit"
                                className="btn font-weight-light btn-primary mt-3 py-2 w-100 border-0"
                                disabled={Btn}
                                onClick={showStaff}

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
                amount={total}
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