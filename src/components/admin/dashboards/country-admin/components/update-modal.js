import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Spinner } from 'react-bootstrap';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Privileges from './privileges';


const UpdateModal = (props) => {

    const { show, hide, admin, getprivilege, update, spinner, privilege } = props;


    return (
        <>
        <Modal
            show={show}
            onHide={hide}
            aria-labelledby="example-custom-modal-styling-title"
            centered
            style={{marginTop:'45px'}}
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
                            <FormControl component="fieldset">
                                <FormLabel component="legend" style={{ fontWeight: 'bold' }}>Assign Privileges</FormLabel>
                            {Privileges.map(pri => {
                                return (
                                    <>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox checked={privilege.name} onChange={getprivilege} name={pri.name} value={pri.value} color="primary"/>}
                                                label={pri.label}
                                            />
                                        </FormGroup>
                                    </>
                                );
                            })}
                            </FormControl>
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


