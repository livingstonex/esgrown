import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Spinner } from 'react-bootstrap';




const EditStaff = ({ show, onHide, id, user, closeModal }) => {

    const [edit, setEdit] = useState([]);
    const [state, setState] = useState({

    })

    useEffect(() => {
        axios.get(`http://172.31.25.5:5000/individuals/`)
            .then(res => {
                if (res.data.length > 0) {
                    const ind = res.data.filter(st => {
                        return st._id === id
                    })
                    setEdit(ind[0])
                }
            })
            .catch(err => console.log(err));
    }, [id])

    console.log(edit)

    const onChange = (e) => {
        setEdit({
            ...edit,
            [e.target.name]: e.target.value
        })
    }

    const submitEdit = async () => {

        const data = {
            fullname: edit.fullname,
            email: edit.email
        }
        try {
            const res = await axios.post(`http://172.31.25.5:5000/individuals/staff/update/${edit._id}`, data);
            console.log(res.dat);
            closeModal()

        } catch (e) {
            console.log(e)
        }

    }

    return (
        <>
            <Modal show={show} onHide={onHide} centered>

                <>
                    <div className="container" style={{ background: '#e9ecef' }} >
                        <div className="mt-3">
                            <div className="row col justify-content-center" style={{ fontSize: '17px' }}>{user && user.org_type === "school" ? "Teacher" : "Staff"} edit</div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label style={{ fontWeight: 'bold' }}>Full Name</label>
                                    <input type="text" value={edit ? edit.fullname : ""} name="fullname" onChange={onChange} className="form-control" required />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label style={{ fontWeight: 'bold' }}>Email</label>
                                    <input type="text" value={edit ? edit.email : ""} name="email" onChange={onChange} className="form-control" required />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label style={{ fontWeight: 'bold' }}>Gender</label>
                                    <input type="text" disabled value={edit ? edit.gender : ""} className="form-control" required />
                                </div>
                            </div>
                            {
                                edit && edit.tic ?
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label style={{ fontWeight: 'bold' }}>Teacher Identification Code</label>
                                            <input type="text" disabled value={edit.tic} className="form-control" required />
                                        </div>
                                    </div>
                                    : ""
                            }


                            <div className="row mt-3">
                                <div className="col">
                                    <label style={{ fontWeight: 'bold' }}>SignUp Date</label>
                                    <input type="text" disabled value={new Date(edit ? edit.createdAt : "").toDateString()} className="form-control" required />
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col">
                                <button
                                    className="btn mb-2 mt-3 w-100 border-0"
                                    style={{ background: '#21A5E7', color: 'white' }}
                                    onClick={submitEdit}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            </Modal>
        </>
    );
}

export default EditStaff;