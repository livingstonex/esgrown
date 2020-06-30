import React ,{useState, useEffect} from 'react';
import { Modal }  from 'react-bootstrap'



const EditModal = ({show, onHide, data}) => {
    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Body>
                    <div className="container">
                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Job Title</label>
                                <input type="text" name="title" value={data ? data.title:""} onChange={{}} placeholder="Job Title" className="form-control" required />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Expected Resumption Date</label>
                                <input type="text" name="title" value={data ? data.erd:""} onChange={{}} placeholder="Job Title" className="form-control" required />
                            </div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
            
        </>
    );
}
export default EditModal