import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Dropdown } from 'react-bootstrap';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchBar from './components/search';
import CreateJob from './components/create-job';
import toast from '../../../util/toast';





const Jobs = () => {

    const [jobs, setJobs] = useState([]);
    const [spinner, setSpinner] = useState(true);

    const [show, setShow] = useState(false);
    const [user, setUser] = useState();
    const [editData, setEditData] = useState();



    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        setUser(user)
        //get all jobs
        axios.get(`http://localhost:5000/jobs/${user.id}`)
            .then(res => {
                if (res.data.length !== 0) {
                    setJobs(res.data);
                    setSpinner(false);
                } else {
                    setSpinner(false);
                    toast("No company jobs found. Add one", "info")
                }
            })
            .catch(err => console.log(err));

    }, []);




    //close jobs create modal and reload jobs
    const closeModal = () => {
        setShow(false);

        axios.get(`http://localhost:5000/jobs/${user.id}`)
            .then(res => {
                if (res.data.length > 0) {
                    setJobs(res.data);
                    setSpinner(false);
                }
            })
            .catch(err => console.log(err));
    };

    const deleteJob = (e) => {
        console.log(e.target.getAttribute('data-id'))
        alert('clicked')
    }

    const editJob = (e) => {
       const editTitle = e.target.getAttribute('data-id');

        const edit = jobs.filter(j => {
            return j.title === editTitle; 
        })

        setEditData(edit);

    }

    return (
        <>
            <br /><br />
            <br />
            <div className="container">
                <div className="container">
                    <div className="row" style={{ background: '#C4C4C4', height: '60px', paddingBottom: '20px', paddingTop: '10px', paddingLeft: '40px' }}>
                        <div className="col-lg-8"><SearchBar /></div>

                        <div className="col-lg-4 d-flex justify-content-end" style={{ cursor: 'pointer'}} onClick={() => setShow(!show)}>
                            <span style={{ marginTop: '10px', color: '#3F51B5', fontSize: '16px', fontWeight: 'bolder' }}>Add Jobs</span>
                        </div>
                    </div>
                </div><br />
                <div className="container">
                    <br /><br />
                    <div className="d-flex justify-content-space-around" style={{ textAlign: 'center' }}>
                        <div className="col"><span style={{ fontSize: "18px", fontWeight: "bold" }}>Job Title</span></div>
                        <div className="col"><span style={{ fontSize: "18px", fontWeight: "bold" }}>Start Date</span></div>
                        <div className="col"><span style={{ fontSize: "18px", fontWeight: "bold" }}>Dead Line</span></div>
                        <div className="col"><span style={{ fontSize: "18px", fontWeight: "bold" }}>Expected Resumption Date</span></div>
                        <div className="col" style={{ fontWeight: "bold" }}><span style={{ fontSize: "18px", float: 'right', marginRight: '60px' }}>View</span></div>
                    </div><br /><br />

                    {
                        spinner ? <Spinner animation="grow" /> :
                            jobs.map(job => {
                                return job.jobs.map((j, index) => {
                                    return (
                                        <>
                                            <div className="row d-flex justify-content-space-around" key={index} style={{ height: '50px', background: "#FFFFFF", borderRadius: '5px', lineHeight: '48px', marginBottom: '15px', textAlign: 'center',boxSizing:'border-box' }}>
                                                <div className="col col-xs-2" style={{ textAlign: 'center' }}>{j.title}</div>
                                                <div className="col col-xs-2" >{j.start_date}</div>
                                                <div className="col col-xs-2" >{j.dead_line}</div>
                                                <div className="col col-xs-2" >{j.erd}</div>
                                                <div className="col col-xs-2 ">

                                                    <div className="d-flex align-items-center ml-auto">
                                                        <Dropdown>
                                                            <Dropdown.Toggle id="dropdown-basic" style={{ color: 'black', fontWeight: 'bolder' }}>
                                                                ....
                                                        </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item data-index={index} data-id={j.title} onClick={editJob} ><EditIcon style={{ color: 'green' }} /> Edit</Dropdown.Item>
                                                                <Dropdown.Item data-index={index} data-id={j._id} onClick={deleteJob} ><DeleteIcon style={{ color: 'brown' }} /> Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>

                                                </div>
                                            </div>
                                        </>
                                    );
                                })
                            })
                    }

                </div>
            </div>
            <CreateJob show={show} onHide={() => setShow(!show)} closeModal={closeModal} />
        </>
    );
}

export default Jobs;