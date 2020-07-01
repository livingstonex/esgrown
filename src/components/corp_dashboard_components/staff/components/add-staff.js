import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';
import { Spinner, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { Card, CardContent } from '@material-ui/core';
import toast from '../../../../util/toast';





const AddStaff = ({ show, onHide, closeModal = () => { }, refreshStaff = () => { } }) => {



    const [data, setData] = useState({
        name: '',
        email: '',
        gender: '',
        password: '',
    });

    const [spinner, setSpinner] = useState(false);

    const [user, setUser] = useState();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        setUser(user)
    }, [])


    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setData({ ...data, [name]: value })
    };

    const notify = (message, type) => toast(message, type);


    //send data to server
    const createUser = () => {

        setSpinner(true)

        const tic = user.org_type === 'school' ? md5(data.email).substring(0, 8).toUpperCase() : null;


        const submitData = {

            fullname: data.name,
            email: data.email,
            password: data.password,
            gender: data.gender,
            status: 'individual',
            phone: null,
            dob: new Date(),
            country: null,
            state: null,
            org_type: user.org_type,
            org_name: user.org_name,
            org_id: user.id,
            sub_status: 'inactive',
            tic: tic

        }


        axios.post('http://ec2-18-188-101-36.us-east-2.compute.amazonaws.com:5000/individuals/check_email', submitData)
            .then(res => {

                if (res.data.length > 0) {

                    if (res.data.org_name != null) {
                        const addExistinUser = window.confirm("A user with this email already exist. Would you like to add this user as your staff");

                        if (addExistinUser) {
                            //get the details of the user with this email and populate the form field
                            axios.post('http://ec2-18-188-101-36.us-east-2.compute.amazonaws.com:5000/individuals/add', submitData)
                                .then(res => {
                                    if (res.data) {
                                        notify(`Great! ${user && user.org_type === "school" ? "Teacher" : "Staff"} added successful`, 'success')
                                        setSpinner(false);
                                        closeModal();
                                        refreshStaff();
                                    }
                                })
                                .catch(err => notify(err.message, 'error'));
                        }
                    }

                    notify("User with this email already exists", "warn");

                    setData({
                        name: '',
                        email: '',
                        password: '',
                        gender: ''
                    });
                    setSpinner(false);
                };
                if (res.data.length == 0) {
                    axios.post('http://ec2-18-188-101-36.us-east-2.compute.amazonaws.com:5000/individuals/add', submitData)
                        .then(res => {
                            if (res.data) {
                                notify(`Great! ${user && user.org_type === "school" ? "Teacher" : "Staff"} added successful`, 'success')
                                setSpinner(false);
                                closeModal();
                                refreshStaff();
                            }
                        })
                        .catch(err => notify(err.message, 'error'));

                };
            })
            .catch(err => notify(err, 'error'));

    }


    return (
        <>

            <Modal show={show} onHide={onHide} centered style={{ marginTop: '50px', }}>

                <div className="container" style={{ background: '#e9ecef' }} >

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>{user && user.org_type === "school" ? "Teacher" : "Staff"} Full Name</label>
                            <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Name" className="form-control" required />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Email</label>
                            <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Email" className="form-control" required />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Gender</label>
                            <select name="gender" onChange={handleChange} className="form-control">
                                <option>Gender...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Password</label>
                            <input type="password" name="password" value={data.password} onChange={handleChange} placeholder="Password..." className="form-control" required />
                        </div>
                    </div>


                    <Modal.Footer>
                        <div className="row mt-3">
                            <div className="col">
                                <button
                                    className="btn mt-3 w-100 border-0"
                                    style={{ background: '#21A5E7', color: 'white' }}
                                    onClick={createUser}
                                >
                                    {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : `Add ${user && user.org_type === "school" ? "Teacher" : "Staff"}`}
                                </button>
                            </div>
                        </div>
                    </Modal.Footer>
                </div>

            </Modal>
        </>
    );
}
export default AddStaff;