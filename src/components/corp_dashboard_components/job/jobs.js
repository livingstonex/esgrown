import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Dropdown } from 'react-bootstrap';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchBar from './components/search';
import CreateJob from './components/create-job';
import toast from '../../../util/toast';
import EditJobs from './components/jobseditmodal';





const Jobs = ({ contentCreation, exerciseCreation }) => {

    const [jobs, setJobs] = useState([]);
    const [spinner, setSpinner] = useState(true);

    const [show, setShow] = useState(false);
    const [user, setUser] = useState();
    const [editData, setEditData] = useState('');
    const [showEdit, setShowEdit] = useState(false)



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



    console.log(jobs);

    //close jobs create modal and reload jobs
    const closeModal = () => {
        setShow(false);

        axios.get(`http://localhost:5000/jobs/${user.id}`)
            .then(res => {
                if (res.data.length > 0) {
                    setJobs(res.data);
                    setSpinner(false);
                    console.log(res.data)
                }
            })
            .catch(err => console.log(err));
    };

    const deleteJob = (e) => {
        console.log(e.target.getAttribute('data-id'))
        alert('clicked')
    }

    const editJob = (e) => {
        const editjobid = e.target.getAttribute('data-jobid');

        console.log(editjobid)
        const edit = jobs.filter(j => {
            return j.job_id === editjobid;
        })
        console.log(edit)
        setEditData(edit);
        setShowEdit(true);

    }
    console.log(editData)
    return (
        <>
            <div className="container" style={{ marginTop: '70px' }}>
                <div className="container">
                    <div className="row" style={{ background: '#C4C4C4', height: '60px', paddingBottom: '20px', paddingTop: '10px', paddingLeft: '40px' }}>
                        <div className="col-lg-6"><SearchBar /></div>

                        <div className="col-lg-6" style={{ cursor: 'pointer' }} >
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn" style={{ background: 'lightgrey', color: 'white' }} onClick={contentCreation}>Create content</div>
                                <div className="btn" style={{ background: 'lightgrey', color: 'white' }} onClick={exerciseCreation}>Create Exercises</div>
                                <div className="btn" style={{ background: 'lightgrey', color: 'white' }} onClick={() => setShow(!show)}>Add Jobs</div>
                                {/* <div style={{ fontSize: '16px', fontWeight: 'bolder' }} onClick={() => setShow(!show)}> <AddCircleIcon fontSize="large" />  Add Jobs</div> */}
                            </div>
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
                        <div className="col" style={{ fontWeight: "bold" }}><span style={{ fontSize: "18px", float: 'right', marginRight: '60px' }}>Actions</span></div>
                    </div><br /><br />

                    {
                        spinner ? <Spinner animation="grow" /> :
                            jobs.map(job => {
                                return job.jobs.map((j, index) => {
                                    return (
                                        <>
                                            <div className=" d-flex justify-content-center align-items-center" key={index} style={{ height: '50px', background: "silver", borderRadius: '5px', marginBottom: '15px', textAlign: 'center', }}>
                                                <div className="col" style={{ textAlign: 'center', fontSize: '10px' }}>{j.title}</div>
                                                <div className="col" >{j.start_date}</div>
                                                <div className="col" >{j.dead_line}</div>
                                                <div className="col" >{j.erd}</div>
                                                <div className="col">
                                                    <Dropdown className="ml-3">
                                                        <Dropdown.Toggle id="dropdown-basic" style={{ color: 'black', fontWeight: 'bolder' }}>
                                                            ....
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item data-index={index} data-jobid={j.job_id} onClick={editJob} ><EditIcon style={{ color: 'green' }} /> Edit</Dropdown.Item>
                                                            <Dropdown.Item data-index={index} data-id={j._id} onClick={deleteJob} ><DeleteIcon style={{ color: 'brown' }} /> Delete</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
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
            <EditJobs show={showEdit} onHide={() => setShowEdit(!showEdit)} data={editData} />
        </>
    );
}

export default Jobs;