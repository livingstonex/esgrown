import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Spinner, Form, Button } from 'react-bootstrap';
import AddStaff from '../../../corp_dashboard_components/staff/components/add-staff';




const AllStaff = ({ show, onHide, amount, closeStaffModal }) => {

    const [staff, setStaff] = useState([]);
    const [company, setCompany] = useState()
    const [companystaff, setCompanystaff] = useState([])
    const [addStaff, setAddStaff] = useState(false);
    const [Btn, setBtn] = useState(false);



    useEffect(() => { 
        const company = JSON.parse(sessionStorage.getItem('key'))
        setCompany(company);

        // //make a request quest and get all company/school staff with sub inactive for subscription
        axios.get(`http://localhost:5000/individuals/staff/${company.id}`)
            .then(res => {
                const unsubscribedStaff = res.data.filter(staff => {
                    return staff.sub_status_compt_mgt === 'inactive' || staff.sub_status_compt_mgt === 'completed' ;
                })
                setCompanystaff(unsubscribedStaff);
                if (unsubscribedStaff.length === 0) {
                    setBtn(true)
                } else {
                    setBtn(false)
                }
            })
            .catch(err => console.log(err));

    }, []);


    const refreshStaff = () => {

        axios.get(`http://localhost:5000/individuals/staff/${company.id}`)
            .then(res => {
                const unsubscribedStaff = res.data.filter(staff => {
                    return staff.sub_status_compt_mgt === 'inactive' || staff.sub_status_compt_mgt === 'completed';
                })
                setCompanystaff(unsubscribedStaff);
                if (unsubscribedStaff.length === 0) {
                    setBtn(true)
                } else {
                    setBtn(false)
                }
            })
            .catch(err => console.log(err));
            setAddStaff(false)

    }


    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header >
                    <Modal.Title>Number of Staff: {companystaff.length}</Modal.Title>
                    <Modal.Title>
                        <button
                        type="submit"
                        className="btn font-weight-light mt-3 mb-3 py-2 border-0"
                        style={{ background: '#53A6E7', color: 'white' }}
                        onClick={() => setAddStaff(true)}
                        >
                            Add Staff
                        </button>
                        
                    </Modal.Title>         
                    
                </Modal.Header>
                
                <div className="container">
                    <span style={{ color:'#E68824', fontSize:'18px'}}>Amount Payable: N {(amount * companystaff.length) / 100}</span>
                    <hr/>
                    {
                        company && company.org_type === 'school' && company.country == "nigeria" ?
                        <Form.Text className="text-muted">
                                Deselection of Teachers for this service is unavailable for your country.
                        </Form.Text>
                            : ""}
                    
                    {companystaff.map(staff => {
                        return (
                                <div className="row mt-3">
                                    <div className="col">
                                        <Form>
                                            <Form.Group controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label={staff.fullname} disabled={company && company.org_type === 'school'? true : false} />
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </div>
                            );
                        })}
                    <div className="row mt-3">
                        <div className="col">
                            <button
                                type="submit"
                                className="btn font-weight-light mt-3 mb-3 py-2 w-100 border-0"
                                style={{ background: '#53A6E7', color: 'white' }}
                                onClick={() => closeStaffModal((amount * companystaff.length))}
                                disabled={Btn}

                            >
                                {/* {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : "Proceed"} */}
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            <AddStaff show={addStaff} onHide={() => setAddStaff(!addStaff)} refreshStaff={refreshStaff} />
        </>
    );
}
export default AllStaff;