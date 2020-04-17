import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@material-ui/core';
import { Spinner, Col } from 'react-bootstrap';


const CreateCountryAdmin = () => {


    const [spinner, setSpinner] = useState(false);
    const [country, setCountry] = useState('');
    const [username, setUsername] = useState('');
    const [state, setState] = useState(
        {
            name: '',
            email: '',
            privileges: '',
            username: '',
            password:'',
            usertype: 'Country Admin'
        }

    );

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setState({
            ...state,
            [name]: value
        })
    }

    const checkCountry = (e) => {
        const country = e.target.value;

        axios.post(`http://localhost:5000/admin/check/${country}`)
            .then(res => {
                if (res.data.length > 0) {
                    alert("An admin already exist for " + country)
                } else {
                    setCountry(country);
                }
                console.log(res.data)
            })
            .catch(err => console.log(err));
    };

    const checkUsername = (e) => {
        const u = e.target.value;
        console.log(e.target.value);

        axios.post(`http://localhost:5000/admin/check/username/${u}`)
            .then(res => {
                if (res.data.length > 0) {
                    alert(`username ${u} already exist`)
                } 
            })
            .catch(err => console.log(err))
    }

    const create = () => {
        setSpinner(true)
        const data = {
            name: state.name,
            country: country,
            email: state.email,
            username: state.username,
            password: state.password,
            role: state.usertype,
            privilege: state.privileges.split('/')

        }
        axios.post(`http://localhost:5000/admin/add`,data)
            .then(res => {
                console.log(res.data);
            if (res.data) {
                alert('Admin created successfully')
                setState({
                    name: '',
                    email: '',
                    privileges: '',
                    username: '',
                    password: '',
                    usertype: ''
                })
                setSpinner(false)
            }
        })
        .catch(err => {
            console.log(err);
            setSpinner(false)

        })
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <Col md={{ span: 12, offset: 3 }}>
                        <Card className="col col-sm-6 col-md-offset-3" style={{ background: '#F7F7F7' }}>
                            <CardContent>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }}>Full Name</label>
                                        <input type="text" name="name" value={state.name} onChange={handleChange} placeholder="Admin Full Name" className="form-control" required />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }}>Username</label>
                                        <input type="text" name="username" value={state.username} onChange={handleChange} onBlur={checkUsername} placeholder="userName" className="form-control" required />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }}>Password</label>
                                        <input type="password" name="password" value={state.password} onChange={handleChange} placeholder="Password" className="form-control" required />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }}>Country</label>
                                        <select className="form-control" name="country" onChange={checkCountry}>
                                            <option>Select Country</option>
                                            <option value="Nigeria">Nigeria</option>
                                            <option value="Ghana">Ghana</option>
                                            <option value="Zambia">Zambia</option>
                                            <option value="Egypt">Egypt</option>
                                            <option value="South Africa">South Africa</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }}>Email</label>
                                        <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="email" className="form-control" required />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }}>UserType</label>
                                        <input type="text" name="usertype" value="Country Admin" disabled className="form-control" required />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }}>Privileges</label>
                                        <select name="privileges" className="form-control" onChange={handleChange} required>
                                            <option value="exercises">Exercises</option>
                                            <option value="services">Services</option>
                                            <option value="exercise/services">Exercise And Services</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col">
                                        <button
                                            className="btn border-0"
                                            style={{ background: '#21A5E7', color: 'white', float: 'right' }}
                                            onClick={create}
                                        >
                                            {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : "Create"}
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Col>
                </div>
            </div>
        </>
    );

}
export default CreateCountryAdmin;