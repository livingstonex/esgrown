import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Spinner } from 'react-bootstrap';


const UpdateModal = (props) => {

    const { show, hide, admin, getprivilege, update, spinner} = props;

    

    return (
        <>
        <Modal
            show={show}
            onHide={hide}
            aria-labelledby="example-custom-modal-styling-title"
            centered
            >
                <Modal.Body style={{ background: '#E1E1E1' }}>
                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Name of Admin</label>
                            <input type="text" name="name" disabled value={admin.name} className="form-control"/>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Username</label>
                            <input type="text" name="name" disabled value={admin.username} className="form-control" />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Country</label>
                            <input type="text" name="name" disabled value={admin.country} className="form-control" required />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Email</label>
                            <input type="text" name="name" disabled value={admin.email} className="form-control" required />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>UserType</label>
                            <input type="text" name="name" disabled value={admin.role} className="form-control" required />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Privileges</label>
                            <select className="form-control" name="privileges" onChange={getprivilege}>
                                <option>Select privilege</option>
                                <option value="exercises">Exercise</option>
                                <option value="services">Services</option>
                                <option value="exercises/services">Exercise and Services</option>
                            </select>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer style={{ background: '#E1E1E1' }}>
                    <div className="row mt-3">
                        <div className="col">
                            <button
                                className="btn border-0"
                                style={{ background: '#21A5E7', color: 'white', float: 'right' }}
                                onClick={update}
                            >
                                {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : "Update"}
                            </button>
                        </div>
                    </div>
                </Modal.Footer>

            </Modal>
        </>
    );
}
export default UpdateModal;


