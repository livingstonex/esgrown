import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import toast from '../../../../util/toast';


const JobsModal = ({ show, onHide, closeModal }) => {

    const [data, setData] = useState([]);
    const [disabled, setDisabled] = useState(false)
    const [user, setUser] = useState();
    const [jobID, setJobID] = useState('');
    const [deadline, setDeadLine] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //get user
        const user = JSON.parse(sessionStorage.getItem('key'))
        setUser(user)
        console.log(user)

        //make api call to get all jobs and set in state
        axios.get(`http://ec2-18-188-101-36.us-east-2.compute.amazonaws.com:5000/jobs`)
            .then(res => {
                if (res.data.length > 0) {
                    setData(res.data)
                }
                console.log(res.data)
            })
            .catch(err => console.log(err));


        //check to see if user has applied for max jobs allowed
        axios.get(`http://ec2-18-188-101-36.us-east-2.compute.amazonaws.com:5000/applications/check/${user.id}`)
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

    const [companiesAppliedTo, setCompaniesAppliedTo] = useState('')
    const [jobTitle, setJobTitle] = useState('')


    const toggleJobs = (e) => {

        setCompaniesAppliedTo(e.target.value);

        data.map((job) => {
            if (job.company_name == e.target.value) {
                setDisplayJobs(job.jobs)
            }
        }

        )

    }


    const postToServer = () => {

        const postData = {
            applicant_id: user.id,
            applicant_name: user.name,
            applicant_email: user.email,
            jobs_applied_for: {
                company: companiesAppliedTo,
                job_title: jobTitle,
                job_id: jobID,
                deadline: deadline
            },


        }

        try {
            setLoading(true)
            axios.post(`http://ec2-18-188-101-36.us-east-2.compute.amazonaws.com:5000/applications/add`, postData)
                .then(res => {
                    setLoading(false);
                    toast(res.data.msg, 'info')
                    closeModal();

                    const user = JSON.parse(sessionStorage.getItem('key'));

                    user.jobs = [{
                        job_title: jobTitle,
                        job_id: jobID
                    }]

                    sessionStorage.setItem('key', JSON.stringify(user));
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err)
                });

        } catch (e) {
            console.log(e)
        }


    }



    const getDesc = (e) => {

        // job.title / job.job_id / job.dead_line
        const splitedValue = e.target.value.split('/');

        const title = splitedValue[0];
        const jobid = splitedValue[1];
        const deadline = splitedValue[2];

        setJobID(jobid);
        setDeadLine(deadline);

        setJobTitle(title);

        displayJobs.map(job => {
            if (job.title == title) {
                setDesc(job.desc)
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
                                return <option value={`${job.title}/${job.job_id}/${job.dead_line}`}>{job.title}</option>
                            }) : ""}
                        </Form.Control>
                    </div>


                    <div className="mb-3">
                        <Form.Control as="textarea" rows="4"
                            value={desc ? desc : ""}
                            disabled={disabled}
                        />
                    </div>
                    <Button size="sm" style={{ background: '#21a5e7', border: '#21a5e7' }} block onClick={postToServer} disabled={loading}>
                        Apply {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
                    </Button>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ background: '#dbdee0', width: '550px' }}>
                <small>Note: you can only add a maximum of two jobs</small>
            </Modal.Footer>
            <Modal.Footer style={{ background: '#dbdee0', width: '550px' }}>
                {/* {
                    jobTitle.length > 0 ?
                        <>
                            Current Jobs: <br />
                            {jobTitle.map(j => {
                                return (
                                    <>
                                        <span style={{ textAlign: 'left' }}>{j}</span>
                                    </>
                                );
                            })}
                        </>
                        : ""} */}
            </Modal.Footer>
        </Modal>
    );
}
export default JobsModal;
