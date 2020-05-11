import React, { useState, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import {FormLabel, FormControl, FormGroup, FormControlLabel, FormHelperText, Checkbox } from '@material-ui/core';





const TutorModal = () => {
    return (
        <>
            <Modal>
                <Modal.Body>
                    <div className="row mt-3">
                        <div className="col">
                            <FormControl component="fieldset">
                                <FormLabel component="legend" style={{ fontWeight: 'bold' }}>Assign Privileges</FormLabel>
                                {Privileges.map(pri => {
                                    return (
                                        <>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox checked={privilege.name} name={pri.name} value={pri.value} color="primary" />}
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
            </Modal>
        </>
    );
}
export default TutorModal;