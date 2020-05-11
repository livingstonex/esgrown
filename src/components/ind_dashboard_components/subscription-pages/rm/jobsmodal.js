import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';


const JobsModal = (props) => {

    const { show, onHide } = props;

    const [data, setData] = useState([]);
    const [disabled, setDisabled] = useState(false)
    const [user, setUser] = useState();
    const [] = useState([]);

    useEffect(() => {
        //get user
        const user = JSON.parse(sessionStorage.getItem('key'))
        setUser(user)

        //make api call to get all jobs and set in state
        axios.get(`http://localhost:5000/jobs`)
            .then(res => {
                if (res.data.length > 0) {
                    setData(res.data)
                }
                console.log(res.data)
            })
            .catch(err => console.log(err));


        //check to see if user has applied for max jobs allowed
        axios.get(`http://localhost:5000/applications/check/${user.id}`)
            .then(res => {
                if (res.data.jobs_applied_for.length > 1) {
                    setDisabled(true)
                }
                console.log(res.data.jobs_applied_for);
            })
            .catch(err => console.log(err));
    }, [])


    const [displayJobs, setDisplayJobs] = useState('')
    const [desc, setDesc] = useState('')

    const [companiesAppliedTo, setCompaniesAppliedTo] = useState([])
    const [jobsAppliedfor, setJobsAppliedfor] = useState([])


    // if (onHide) {
    //     setCompaniesAppliedTo('');
    //     setJobsAppliedfor('');
    // }


    const toggleJobs = (e) => {

        setCompaniesAppliedTo(companiesAppliedTo.concat(e.target.value));
        data.map((job) => {
            if (job.company_name == e.target.value) {
                setDisplayJobs(job.jobs)

            }
        }

        )

    }



    const postToServer = () => {

        if (companiesAppliedTo.length < 1) {
            alert("you need to apply to at least one company")
            return
        } else if (jobsAppliedfor.length > 2) {
            alert("You can only apply to a max of two jobs")
            setJobsAppliedfor('')
            return
        }

        const postData = {
            applicant_id: user.id,
            applicant_name: user.name,
            applicant_email: user.email,
            companies_applied_to: companiesAppliedTo,
            jobs_applied_for: jobsAppliedfor
        }

        console.log(postData)

        // axios.post(`http://localhost:5000/applications/add`, postData)
        //     .then(res => {
        //         if (res.data.length > 0) {
        //             alert("Job applied for successfully")
        //         }
        //     })
        //     .catch(err => console.log(err));

        setCompaniesAppliedTo('')
        setJobsAppliedfor('')
    }



    const getDesc = (e) => {


        setJobsAppliedfor(jobsAppliedfor.concat(e.target.value))

        displayJobs.map((job) => {
            if (job.title == e.target.value) {
                setDesc(job.description)
            }
        })
    }


    return (

        <Modal show={show} onHide={onHide} centered style={{}}>

            <Modal.Body style={{ background: '#fafafa', height: '340px', width: '550px' }}>
                <h5>Get A Job</h5>
                <div className="container">
                    <div className="mb-3" style={{}}>
                        <Form.Control as="select" onChange={toggleJobs} disabled={disabled}>
                            <option>where you would like to work</option>
                            {data.map((job) => {
                                return <option name={job.company_name} value={job.company_name}>{job.company_name}</option>
                            })}

                        </Form.Control>
                    </div>
                    <div className="mb-3">
                        <Form.Control as="select" onChange={getDesc} disabled={disabled}>
                            <option>what would you like to work as</option>
                            {displayJobs ? displayJobs.map((job) => {
                                return <option value={job.title}>{job.title}</option>
                            }) : ""}
                        </Form.Control>
                    </div>


                    <div className="mb-3">
                        <Form.Control as="textarea" rows="4"
                            value={desc ? desc : ""}
                            disabled={disabled}
                        />
                    </div>
                    <Button size="sm" style={{ background: '#21a5e7', border: '#21a5e7' }} block onClick={postToServer}>
                        {disabled ? "You have applied for max Jobs already" : "Apply"}
                    </Button>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ background: '#dbdee0', width: '550px' }}>
                <small>Note: you can only add a maximum of two jobs</small>
            </Modal.Footer>
            <Modal.Footer style={{ background: '#dbdee0', width: '550px' }}>
                {
                    jobsAppliedfor.length > 0 ?
                        <>
                            Current Jobs: <br />
                            {jobsAppliedfor.map(j => {
                                return (
                                    <>
                                        <span style={{ textAlign: 'left' }}>{j}</span>
                                    </>
                                );
                            })}
                        </>
                        : ""}
            </Modal.Footer>
        </Modal>
    );
}
export default JobsModal;
