import React, { useState, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';



const StaffDetails = ({ details,show, onHide }) => {

    const [user, setUser] = useState();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        setUser(user);

    }, []);

    // const lastlogin = details.length > 0 ? details.createdAt.split('T')[0] : "";

    console.log(details)
    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                {/* <Modal.Title style={{fontSize:'15px',paddingLeft:'14px'}}></Modal.Title> */}
                        <>
                            <div className="container" style={{ background: '#e9ecef' }} >
                                <div style={{ padding: '50px' }}>
                                    <div className="row col" style={{ fontSize: '17px' }}>{user && user.org_type === "school" ? "Teacher" : "Staff"} Details</div>

                                    <div className="row mt-3">
                                        <div className="col">
                                            <label style={{ fontWeight: 'bold' }}>Full Name</label>
                                            <input type="text" disabled value={details.fullname} className="form-control" required />
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col">
                                            <label style={{ fontWeight: 'bold' }}>Email</label>
                                            <input type="text" disabled value={details.email} className="form-control" required />
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col">
                                            <label style={{ fontWeight: 'bold' }}>Gender</label>
                                            <input type="text" disabled value={details.gender} className="form-control" required />
                                        </div>
                                    </div>

                                    {details.tic ?
                                        <div className="row mt-3">
                                            <div className="col">
                                                <label style={{ fontWeight: 'bold' }}>Teacher Identification Code</label>
                                                <input type="text" disabled value={details.tic} className="form-control" required />
                                            </div>
                                        </div>
                                        : ""
                                    }

                                    <div className="row mt-3">
                                        <div className="col">
                                            <label style={{ fontWeight: 'bold' }}>SignUp Date</label>
                                            <input type="text" disabled value={new Date(details.createdAt).toDateString()} className="form-control" required />
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col">
                                            <label style={{ fontWeight: 'bold' }}>Last Login Date</label>

                                            <input type="text" disabled value={new Date(details.lastLogin).toDateString()} className="form-control" required />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
            </Modal>
        </>
    );
}
export default StaffDetails;