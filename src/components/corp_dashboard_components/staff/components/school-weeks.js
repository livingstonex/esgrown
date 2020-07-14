import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';


const SchoolWeeks = ({ show, onHide, getSchoolWeeks }) => {

    const [weeks, setWeeks] = useState('');

    const getweeks = (e) => {
        setWeeks( e.target.value )
    }

    const submit = () => {
        getSchoolWeeks(weeks)
    }

    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header>Start A New Term</Modal.Header>
                <Modal.Body>
                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>School Weeks</label>
                            <input type="text" name="week" onChange={getweeks} value={weeks} className="form-control" placeholder="enter total weeks for the term" required />
                        </div>
                    </div>
                </Modal.Body>

                <div className="row mt-3 mb-3 mr-2 ml-2">
                    <div className="col">
                        <button
                            className="btn mt-3 w-100 border-0"
                            style={{ background: '#21A5E7', color: 'white' }}
                            onClick={submit}
                        >
                            send!
                            </button>
                    </div>
                </div>

            </Modal>
        </>
    );
}
export default SchoolWeeks;