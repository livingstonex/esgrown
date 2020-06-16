import React, { useState, useEffect } from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';
import { ExpansionPanelDetails } from '@material-ui/core';



const DeleteStaff = ({ show, onHide, user, details }) => {
    
    const [delBtn, setDelBtn] = useState();
    const [data, setData] = useState({
        del:''
    });
    const [Btn, setBtn] = useState(true);

  const  onChange = (e) => {
      setData({ [e.target.name]: e.target.value });

        if (details.fullname == data.del) {
            setBtn(false);
        }
    }

    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {user && user.org_type === "school" ? "Teacher" : "Staff"}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>To delete <span style={{ color: 'red' }}> {details.fullname}</span> type <span style={{ color: 'red' }}> {details.fullname}</span></p>
                    <input type="text" className="form-control" value={data.del} name="del" onChange={onChange} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">NO</Button>
                    <Button variant="danger" disabled={Btn} >YES</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default DeleteStaff;