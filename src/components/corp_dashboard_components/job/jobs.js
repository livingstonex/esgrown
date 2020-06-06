import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchBar from './components/search';
import CreateJob from './components/create-job';




const Jobs = () => {

    const [jobs, setJobs] = useState([]);
    const [spinner, setSpinner] = useState(true);

    const [show, setShow] = useState(false);



    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));

        //get all jobs
        axios.get(`http://localhost:5000/jobs`)
            .then(res => {
                if (res.data.length > 0) {
                    setJobs(res.data);
                    setSpinner(false);

                }
            })
            .catch(err => console.log(err));

    }, []);




    //close jobs create modal and reload jobs
    const closeModal = () => {
        setShow(false);

        axios.get(`http://localhost:5000/jobs`)
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
        console.log(e.target.getAttribute('data-id'))
        alert('clicked')

    }

    return (
        <>
            <br />
            <div className="container" style={{marginTop:'60px'}}>
                <div className="container">
                    <div className="row justify-content-center" style={{ background: '#C4C4C4', height: '60px', paddingBottom: '20px', paddingTop: '10px', paddingLeft: '40px' }}>
                        <div style={{ width: '500px', float: 'left' }}><SearchBar /></div>

                        <div style={{ cursor: 'pointer', height: 'auto', float: 'right', marginLeft: '400px' }} onClick={() => setShow(!show)}>
                            <span style={{ float: 'right', marginLeft: '10px', marginBottom: '20px', marginTop: '10px', color: '#3F51B5', fontSize: '16px', fontWeight: 'bolder' }}>Add Jobs</span>

                            {/* <div style={{ float: 'right', width: '40px', height: '40px', background: '#3F51B5', borderRadius: '50%', fontSize: '40px', lineHeight: '50px', textAlign: 'center' }}>
                                <span style={{ color: 'white', padding: '20px' }}>+</span>
                            </div> */}
                        </div>
                    </div>
                </div><br />
                <div className="container">
                    <br /><br />
                    <div className="row" style={{ textAlign: 'center' }}>
                        <div className="col col-lg-2 col-sm-6"><span style={{ fontSize: "18px", fontWeight: "bold" }}>Company Name</span></div>
                        <div className="col col-lg-3 col-sm-6"><span style={{ fontSize: "18px", fontWeight: "bold" }}>Job Title</span></div>
                        <div className="col col-lg-2 col-sm-6"><span style={{ fontSize: "18px", fontWeight: "bold" }}>Start Date</span></div>
                        <div className="col col-lg-2 col-sm-6"><span style={{ fontSize: "18px", fontWeight: "bold" }}>End Date</span></div>
                        <div className="col col-lg-3 col-sm-6" style={{ fontWeight: "bold" }}><span style={{ fontSize: "18px", float: 'right', marginRight: '60px' }}>View</span></div>
                    </div><br /><br />

                    {
                        spinner ? <Spinner animation="grow" /> :
                            jobs.map(job => {
                                return job.jobs.map((j, index) => {
                                    return (
                                        <>
                                            <div className="row" key={index} style={{ height: '50px', background: "#FFFFFF", borderRadius: '5px', lineHeight: '48px', marginBottom: '15px', textAlign: 'center' }}>
                                                <div className="col col-lg-2 col-sm-6" >{job.company_name}</div>
                                                <div className="col col-lg-3 col-sm-6" style={{ textAlign: 'center' }}>{j.title}</div>
                                                <div className="col col-lg-2 col-sm-6" >{j.start_date}</div>
                                                <div className="col col-lg-2 col-sm-6" >{j.dead_line}</div>
                                                <div className="col col-lg-3 col-sm-6 "><span className="dropdown" data-toggle="dropdown" drop="left" style={{ fontSize: '20px', fontWeight: 'bolder', float: 'right', marginRight: '60px', cursor: 'pointer' }}>...

                                                    <span className="dropdown-menu" style={{ background: '#E9E9E9' }}>
                                                        <span className="dropdown-item" data-index={index} data-id={j._id} onClick={editJob}><p><EditIcon style={{ color: 'green' }} /> Edit</p></span>
                                                        <span className="dropdown-item" data-index={index} data-id={j._id} onClick={deleteJob}><DeleteIcon style={{ color: 'brown' }} /> Delete</span>
                                                    </span>
                                                </span></div>
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