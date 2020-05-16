import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { Card, CardContent } from '@material-ui/core';





const AddStaff = ({ show, onHide, closeModal }) => {



    const [data, setData] = useState({
        name: '',
        email: '',
        gender: '',
        dob: '',
        phone: '',
        country: '',
        state: '',
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

    console.log(data)


    //send data to server
    const createUser = () => {

        setSpinner(true)

        const submitData = {

            fullname: data.name,
            email: data.email,
            password: data.password,
            gender: data.gender,
            phone: data.phone,
            dob: data.dob,
            country: data.country,
            state: data.state,
            status: data.status,
            corp_type: user.corp_type,
            corp_name: user.corp_name

        }

        axios.post('http://localhost:5000/individuals/check_email', submitData)
            .then(res => {
                if (res.data.length > 0) {
                    //display a flash message that user already exists
                    alert("User Already Exists");
                    setData({
                        name: '',
                        email: '',
                        password: '',
                        gender: '',
                        phone: '',
                        dob: '',
                        country: '',
                        state: '',

                    });
                }
            })
            .catch(err => console.log(err));


        closeModal();

        //post job to server
    }

    return (
        <>

            <Modal show={show} onHide={onHide} centered style={{ marginTop: '50px', }}>

                <div className="container" style={{ background: '#e9ecef' }} >

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>{user && user.corp_type === "school" ? "Teacher" : "Staff"} Full Name</label>
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
                            <label style={{ fontWeight: 'bold' }}>Date Of Birth</label>
                            <input type="date" name="dob" value={data.dob} onChange={handleChange} className="form-control" required />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Phone</label>
                            <input type="number" name="phone" value={data.phone} onChange={handleChange} placeholder="Phone Number" className="form-control" required />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Country</label>
                            <input type="text" name="country" value={data.country} onChange={handleChange} placeholder="Country" className="form-control" required />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>State</label>
                            <input type="text" name="country" value={data.state} onChange={handleChange} placeholder="State" className="form-control" required />
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
                                    {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : `Create ${user && user.corp_type === "school" ? "Teacher" : "Staff"}`}
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