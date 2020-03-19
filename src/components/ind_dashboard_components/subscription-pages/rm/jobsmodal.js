import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';


const JobsModal = (props) => {

    const { show, onHide } = props;

    // const [apple, setApple] = useState(false);

    useEffect(() => {
        //make api call to get all jobs and set in state
    }, [])


    const [displayJobs, setDisplayJobs] = useState('')
    const [desc, setDesc] = useState('')

    const [companiesAppliedTo, setCompaniesAppliedTo] = useState([])
    const [jobsAppliedfor, setJobsAppliedfor] = useState([])



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
        const userDetails = JSON.parse(sessionStorage.getItem('key'))
        if (companiesAppliedTo.length < 1) {
            alert("you need to apply to at least one company")
            return
        }
        const postData = {
            id: userDetails.id,
            name: userDetails.name,
            email: userDetails.email,
            companies_applied_to: companiesAppliedTo,
            jobs: jobsAppliedfor
        }

        console.log(postData)
        //make axios post request and attach user id.
    }

    const getDesc = (e) => {


        setJobsAppliedfor(jobsAppliedfor.concat(e.target.value))

        displayJobs.map((job) => {
            if (job.title == e.target.value) {
                // console.log(job.description);
                setDesc(job.description)
            }
        })
    }
    console.log(companiesAppliedTo)
    console.log(jobsAppliedfor)


    const data = [{
        company_name: 'Apple',
        jobs: [
            { title: 'sys admin', description: "We'll have several cards, so, for the container element it will be displayed as a grid", dead_line: '3/10/2020' },
            { title: 'Data Analyst', description: "We'll have several cards, so, for the container element it will be displayed as a grid", dead_line: '3/10/2020' },
            { title: 'Engineer', description: "We'll have several cards, so, for the container element it will be displayed as a grid", dead_line: '3/10/2020' }
        ]
    },
    {
        company_name: 'IBM',
        jobs: [
            { title: 'Data admin', description: "We'll have several cards, so, for the container element it will be displayed as a grid", dead_line: '3/10/2020' },
            { title: 'python Dev', description: "We'll have several cards, so, for the container element it will be displayed as a grid", dead_line: '3/10/2020' },
            { title: 'java dev', description: "We'll have several cards, so, for the container element it will be displayed as a grid", dead_line: '3/10/2020' },
        ]
    },
    {
        company_name: 'MicroSoft',
        jobs: [
            { title: 'javascript', description: "We'll have several cards, so, for the container element it will be displayed as a grid", dead_line: '3/10/2020' },
            { title: 'react', description: "We'll have several cards, so, for the container element it will be displayed as a grid", dead_line: '3/10/2020' },
            { title: 'flutter', description: "We'll have several cards, so, for the container element it will be displayed as a grid", dead_line: '3/10/2020' },
        ]

    }
    ]

    return (

        <Modal show={show} onHide={onHide} centered style={{}}>

            <Modal.Body style={{ background: '#fafafa', height: '340px', width: '550px' }}>
                <h5>Get A Job</h5>
                <div className="container">
                    <div className="mb-3" style={{}}>
                        <Form.Control as="select" onChange={toggleJobs}>
                            <option>where you would like to work</option>
                            {data.map((job) => {
                                return <option name={job.company_name} value={job.company_name}>{job.company_name}</option>
                            })}

                        </Form.Control>
                    </div>
                    <div className="mb-3">
                        <Form.Control as="select" onChange={getDesc}>
                            <option>what would you like to work as</option>
                            {displayJobs ? displayJobs.map((job) => {
                                return <option value={job.title}>{job.title}</option>
                            }) : ""}
                        </Form.Control>
                    </div>


                    <div className="mb-3">
                        <Form.Control as="textarea" rows="4"
                            value={desc ? desc : ""}
                        />
                    </div>
                    <Button size="sm" style={{ background: '#21a5e7', border: '#21a5e7' }} block onClick={postToServer}>Apply</Button>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ background: '#dbdee0', width: '550px' }}>
                <small>Note: you can only add a maximum of two jobs</small>
            </Modal.Footer>
        </Modal>
    );
}
export default JobsModal;
