import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, FormLabel, FormControl, FormGroup, FormControlLabel, FormHelperText, Checkbox } from '@material-ui/core';
import { Spinner, Col } from 'react-bootstrap';
import Privileges from './privileges';
import SeniorPrivileges from './senior';
import JuniorPrivileges from './junior';


const CreateAdmin = () => {



    const [spinner, setSpinner] = useState(false);
    const [user, setUser] = useState('');
    const [adminTutorLevel, setAdminTutorLevel] = useState();
    const [seniorTutorPrivilege, setSeniorTutorPrivilege] = useState({
        mathematics: false,
        physics: false,
        chemistry: false,
        biology: false,
        geography: false,
        economics: false,
        accounting: false,
        history: false,
        generalKnowledge: false
    });
    const [juniorTutorPrivilege, setJuniorTutorPrivilege] = useState({
        mathematics: false,
        socialStudies: false,
        integratedScience: false,
        businessStudies: false,
        generalKnowledge: false,
        history: false
    });
    const [adminType, setAdminType] = useState('');

    const [state, setState] = useState(
        {
            name: '',
            email: '',
            username: '',
            password: '',
            country: '',
            usertype: ''
        }

    );

    const [privilege, setPrivilege] = useState({
        EAS: false,
        EFA: false,
        LM: false,
        RM: false,
        LMExercise: false,
        RMExercise: false,
        AllServices: false,
        AllExercises: false
    });

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("key"));
        setUser(user)
    }, []);

    //set privileges check box state
    const getPrivileges = event => {
        setPrivilege({ ...privilege, [event.target.name]: event.target.checked });
    };

    //handle other form state
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setState({
            ...state,
            [name]: value
        })
    }

    //set admin type to determine privileges to show
    const adminUserType = e => {

        setAdminType(e.target.value);

    }
    const tutorLevel = e => {
        setAdminTutorLevel(e.target.value)

    }

    //tutor senior privileges checkbox state
    const getTutorPrivileges = event => {
        setSeniorTutorPrivilege({ ...seniorTutorPrivilege, [event.target.name]: event.target.checked });
    };
    // tutor junior privileges checkbox state
    const getJuniorTutorPrivileges = event => {
        setJuniorTutorPrivilege({ ...juniorTutorPrivilege, [event.target.name]: event.target.checked });
    };

    //check username to prevent duplicates
    const checkUsername = (e) => {
        const u = e.target.value;

        axios.post(`http://localhost:5000/admin/check/username/${u}`)
            .then(res => {
                if (res.data.length > 0) {
                    alert(`username ${u} has been taken`)
                }
            })
            .catch(err => console.log(err))
    }

    //send data to server
    const create = () => {
        setSpinner(true);

        const assignedPrivileges = Object.keys(privilege).filter(pri => {
            return privilege[pri] === true;
        })
        const assignedSeniorTutorPrivileges = Object.keys(seniorTutorPrivilege).filter(tutor => {
            return seniorTutorPrivilege[tutor] === true;
        });

        const assignedJuniorTutorPrivileges = Object.keys(juniorTutorPrivilege).filter(tutor => {
            return juniorTutorPrivilege[tutor] === true;
        });

        let privileges;

        if (adminType === "Admin") {

            privileges = assignedPrivileges

        } else if (adminType === "Tutor" && adminTutorLevel === "Senior") {

            privileges = assignedSeniorTutorPrivileges;

        } else if (adminType === "Tutor" && adminTutorLevel === "Junior") {

            privileges = assignedJuniorTutorPrivileges;
        }


        const data = {
            name: state.name,
            email: state.email,
            username: state.username,
            password: state.password,
            country: user.country,
            role: adminType === "Tutor" ? "Tutor" : "Admin",
            tutor_level: adminTutorLevel ? adminTutorLevel : null,
            privilege: privileges

        }

        console.log(data);

        axios.post(`http://localhost:5000/admin/add`, data)
            .then(res => {
                console.log(res.data);
                if (res.data) {
                    alert('Admin created successfully')
                    setState({
                        name: '',
                        email: '',
                        username: '',
                        password: '',
                    })
                    setSpinner(false)
                }
            })
            .catch(err => {
                console.log(err);
                setSpinner(false)

            })

        setPrivilege({
            EAS: false,
            EFA: false,
            LM: false,
            RM: false,
            LMExercise: false,
            RMExercise: false,
            AllServices: false,
            AllExercises: false
        })
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <Col md={{ span: 12, offset: 3 }}>
                        <Card className="col col-sm-6 col-md-offset-3" style={{ background: '#E1E1E1' }}>
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
                                        <label style={{ fontWeight: 'bold' }}>Email</label>
                                        <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="email" className="form-control" required />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }}>Amin Type</label>
                                        <select onChange={adminUserType} className="form-control">
                                            <option >Select Admin Type</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Tutor">Tutor</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="row mt-3">
                                    <div className="col">
                                        <label style={{ fontWeight: 'bold' }}>Country</label>
                                        <input type="text" name="country" value={user.country} disabled className="form-control" required />
                                    </div>
                                </div>

                                {adminType === "Tutor" ?
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label style={{ fontWeight: 'bold' }}>Level</label>
                                            <select onChange={tutorLevel} className="form-control">
                                                <option>Select Tutor Level</option>
                                                <option value="Junior">Basic (Primary / Junior Sec.)</option>
                                                <option value="Senior">Post Basic ( Senior Sec.)</option>
                                            </select>
                                        </div>
                                    </div>
                                    : adminType === "Admin" ?
                                        <div className="row mt-3">
                                            <div className="col">
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend" style={{ fontWeight: 'bold' }}>Assign Privileges</FormLabel>
                                                    {Privileges.map(pri => {
                                                        return (
                                                            <>
                                                                <FormGroup>
                                                                    <FormControlLabel
                                                                        control={<Checkbox checked={privilege.name} onChange={getPrivileges} name={pri.name} value={pri.value} color="primary" />}
                                                                        label={pri.label}
                                                                    />
                                                                </FormGroup>
                                                            </>
                                                        );
                                                    })}

                                                </FormControl>
                                            </div>
                                        </div>
                                        : ""
                                }
                                {adminTutorLevel === "Senior"
                                    ?
                                    <div className="row mt-3">
                                        <div className="col">
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend" style={{ fontWeight: 'bold' }}>Assign Tutor Privileges</FormLabel>
                                                {
                                                    SeniorPrivileges.map(tp => {
                                                        return (
                                                            <>
                                                                <FormGroup>
                                                                    <FormControlLabel
                                                                        control={<Checkbox checked={seniorTutorPrivilege.name} onChange={getTutorPrivileges} name={tp.name} value={tp.value} color="primary" />}
                                                                        label={tp.label}
                                                                    />
                                                                </FormGroup>
                                                            </>
                                                        );
                                                    })

                                                }

                                            </FormControl>

                                        </div>

                                    </div>
                                    :
                                    adminTutorLevel === "Junior"
                                        ?
                                        <div className="row mt-3">
                                            <div className="col">
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend" style={{ fontWeight: 'bold' }}>Assign Tutor Privileges</FormLabel>
                                                    {
                                                        JuniorPrivileges.map(tp => {
                                                            return (
                                                                <>
                                                                    <FormGroup>
                                                                        <FormControlLabel
                                                                            control={<Checkbox checked={juniorTutorPrivilege.name} onChange={getJuniorTutorPrivileges} name={tp.name} value={tp.value} color="primary" />}
                                                                            label={tp.label}
                                                                        />
                                                                    </FormGroup>
                                                                </>
                                                            );
                                                        })

                                                    }

                                                </FormControl>

                                            </div>

                                        </div>
                                        :
                                        ""
                                }
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
export default CreateAdmin;