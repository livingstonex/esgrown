import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const JobsModal = (props) => {


    const { show, onHide } = props;
    return (

        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: 18 }}>Jobs from Apple</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul style={{ listStyle: 'none',margin:'20px' }}>
                    <li style={{ cursor: 'pointer' }}>SoftWare Engineer</li>
                    <li style={{ cursor: 'pointer' }}>Data Analyst</li>
                    <li style={{ cursor: 'pointer' }}>System Administrator</li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <small>Note: you can only ad a maximunm of two jobs</small>
            </Modal.Footer>
        </Modal>
    );
}
export default JobsModal;
