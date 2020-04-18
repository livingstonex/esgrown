import React from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';



const DeleteModal = (props) => {

    const { show, hide, user, del } = props;

    
    return (
        <>
            <Modal
                show={show}
                onHide={hide}
                aria-labelledby="example-custom-modal-styling-title"
                centered
            >
                <Modal.Body style={{textAlign:'center'}}>
                    <p>Are you sure you want to delete user {user.name} </p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-sm btn-primary" onClick={del}>Yes</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default DeleteModal;