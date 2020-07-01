import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Modal } from 'react-bootstrap';
import { Card, CardContent } from '@material-ui/core';
import JobIdFunc from '../../../../gen_job_id';





const CreateJob = ({ show, onHide, closeModal }) => {


    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        setUser(user);
        const id = JobIdFunc();
        setJobsData({
            title: '',
            email: '',
            start_date: '',
            dead_line: '',
            erd: '',
            desc: '',
            job_id: id
        })

    }, [])

    const [companyName, setCompanyName] = useState('');

    const [jobsData, setJobsData] = useState({
        title: '',
        email: '',
        start_date: '',
        dead_line: '',
        erd: '',
        desc: '',
        job_id: ''
    });

    const [spinner, setSpinner] = useState(false);
    console.log(jobsData)


    const [user, setUser] = useState()


    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setJobsData({ ...jobsData, [name]: value })
    };

    // const setCompany = (e) => {
    //     setCompanyName(e.target.value);
    // };


    //send data to server
    const createJob = () => {

        setSpinner(true)

        const submitData = {
            company_name: user.name,
            jobs: jobsData,
            company_id: user.id
        }

        //post job to server
        axios.post(`http://18.188.101.36:5000/jobs/add`, submitData)
            .then(res => {
                console.log(res.data)
                if (res.data) {
                    setSpinner(false);
                    closeModal();
                }

            })
            .catch(err => console.log(err));

        setJobsData({
            title: '',
            email: '',
            start_date: '',
            dead_line: '',
            erd: '',
            desc: ''

        });
        setCompanyName('')
    }

    return (
        <>

            <Modal show={show} onHide={onHide} centered style={{ marginTop: '60px', marginBottom: '70px' }}>

                <div className="container">
                    {/* <div className="row mt-3">
                        <div className="col">
                            <input type="hidden" name="jobId" value={jobsData.jobId} placeholder="Company Name" className="form-control" required />
                        </div>
                    </div> */}

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Job Title</label>
                            <input type="text" name="title" value={jobsData.title} onChange={handleChange} placeholder="Job Title" className="form-control" required />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Email</label>
                            <input type="email" name="email" value={jobsData.email} onChange={handleChange} placeholder="Email to apply to" className="form-control" required />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Start Date</label>
                            <input type="date" name="start_date" value={jobsData.startDate} onChange={handleChange} placeholder="when applications begin" className="form-control" required />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Dead Line</label>
                            <input type="date" name="dead_line" value={jobsData.dead_line} onChange={handleChange} placeholder="Dead line" className="form-control" required />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Expected Resumption Date </label>
                            <input type="date" name="erd" value={jobsData.erd} onChange={handleChange} placeholder="ERD" className="form-control" required />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Job Description</label>
                            <textarea type="text" name="desc" rows="3" value={jobsData.desc} onChange={handleChange} placeholder="Job Description" className="form-control" required ></textarea>
                        </div>
                    </div>
                    <Modal.Footer>
                        <div className="row mt-2 mb-4">
                            <div className="col">
                                <button
                                    className="btn w-100 border-0"
                                    style={{ background: '#21A5E7', color: 'white' }}
                                    onClick={createJob}
                                >
                                    {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : "Create Job"}
                                </button>
                            </div>
                        </div>
                    </Modal.Footer>
                </div>
            </Modal>
            <br />
            <br />
        </>
    );
}
export default CreateJob;