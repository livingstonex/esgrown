import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Spinner } from 'react-bootstrap/';
import axios from 'axios';


export default function Form(props){
   
    const [modalShow, setModalShow] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [HLE, setHLE] = useState("");
    const [NOWP, setNOWP] = useState("");

    const onChangeHLE = (e) => {
        setHLE(e.target.value);
    }

    const onChangeNOWP = (e) => {
        setNOWP(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const SubObject = {
            user_id: props.user.id,
            sub_status: false,
            user_name: props.user.name,
            user_email: props.user.email,
            user_status: props.user.status,
            highest_level_of_education: HLE,
            nature_of_work_business: NOWP
        }

        try {
            setSpinner(true);
            axios.post('http://localhost:5000/subscriptionlm/add', SubObject)
                    .then((res) => {
                        console.log(res.data);
                        setSpinner(false);
                        setModalShow(false);
                    })
                    .catch(err => {
                        console.log('Err: ' + err);
                        setSpinner(false);
                        setModalShow(false);
                    });
        } catch (error) {
            console.log(error);
            setSpinner(false);
            setModalShow(false);
        }

    }
    return (
        <React.Fragment>
            <div className="ml-auto d-flex align-items-center"> 
                <React.Fragment>
                    <button className="btn btn-info btn-sm" onClick={() => setModalShow(true)}>Subscribe</button>
                </React.Fragment>
                
        </div>
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            aria-labelledby="example-custom-modal-styling-title"
            centered
                >
                    <Modal.Body>
                        <form className="container py-4" onSubmit={onSubmit} >
                            <div className="row">
                                <div className="col">
                                    <h6>Subscription Details</h6>
                                </div>
                            </div>
                            {/* Level of Education */}
                            <div className="row mt-3">
                                <div className="col">
                                <select className="form-control" required onChange={onChangeHLE}>
                                    <option>Level of Education</option>
                                    <option value="degree">Degree</option>
                                    <option value="masters">Masters</option>
                                    <option value="phd">Ph.D</option>
                                </select>
                                </div>
                            </div>

                         {/* Intended Study field */}
                            <div className="row mt-3">
                                <div className="col"> 
                                    <textarea value={NOWP} onChange={onChangeNOWP} rows='7' className="form-control" required placeholder="Nature of Work or Business">

                                    </textarea>
                                </div>
                            </div>

                            {/* submit button */}
                            <div className="row mt-3">
                                <div className="col">
                                    <button
                                        type="submit"
                                        className="btn font-weight-light btn-primary mt-3 py-2 w-100 border-0"
                                        disabled={spinner}
                                    >Proceed  {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/> : ""}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
        
        </React.Fragment>
    );
}