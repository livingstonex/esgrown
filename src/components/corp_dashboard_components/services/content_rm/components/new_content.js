import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import toast from '../../../../../util/toast';



const NewContent = ({ reloadContentLog }) => {

    const [data, setData] = useState({
        title: '',
        content: '',
        job_title: '',
        job_id: '',
        job_deadline: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);


    const [spinner, setSpinner] = useState(false)

    const [comp, setComp] = useState();

    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const comp = JSON.parse(sessionStorage.getItem("key"));
        setComp(comp);
        getAllJobs(comp.id);

    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({
            ...data,
            [name]: value
        })

    }

    const handleJob = (e) => {
        const splitValue = e.target.value;

        const job_title = splitValue.split('/')[0];
        const job_id = splitValue.split('/')[1];
        const job_deadline = splitValue.split('/')[2];

        setData({ ...data, job_title: job_title, job_id: job_id, job_deadline: job_deadline });
    }

    const selectImage = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            setSelectedFile(reader.result)
        }
        reader.readAsDataURL(file);
    }


    const handleSubmit = (e) => {
        setSpinner(true)
        e.preventDefault();

        //================= make job details is present b4 form is submited =======
        if ((data.job_id === '') || (data.job_id === 'null')) {
            toast('you must select a job', 'warn')
            setSpinner(false)
            return
        } else {
            const submitData = {
                title: data.title,
                content: data.content,
                media: selectedFile,
                corp_id: comp.id,
                job_id: data.job_id,
                job_deadline: data.job_deadline,
                job_title: data.job_title
            }


            axios.post(`http://172.31.25.5:5000/corpservicecontent/add`, submitData)
                .then(res => {
                    console.log(res.data)
                    setSpinner(false)
                    reloadContentLog(comp.id)
                    toast('new content created', 'success');
                })
                .catch(err => {
                    setSpinner(false);
                    toast(err, 'error')
                });

            setData({
                title: '',
                content: '',
                job_title: '',
                job_id: '',
                job_deadline: ''
            })

        }



    }


    return (
        <>
            <Card className="col col-lg-6 col-sm-6">
                <CardContent>
                    <h6>Create Recruitment Content</h6>
                    <form className="container py-4" onSubmit={handleSubmit}>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Select a Job</label>
                                <select name="job" onChange={handleJob} className="form-control" required >
                                    <option value="null">Select job</option>
                                    {mapJobs()}
                                </select>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Content Title</label>
                                <input type="text" name="title" value={data.title} onChange={handleChange} placeholder="Content Title" className="form-control" required />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Image / Video</label>
                                <input type="file" name="image" onChange={selectImage} accept="image/*,video/*" className="form-control" required />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Content</label>
                                <textarea name="content" onChange={handleChange} className="form-control" rows="10" placeholder="content body" required>{data.content}</textarea>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <button
                                    className="btn font-weight-light mt-3 py-2 w-100 border-0"
                                    style={{ background: '#21A5E7', color: 'white' }}
                                    type="submit"
                                    disabled={spinner}
                                >
                                    Submit   {spinner ? <i className="fa fa-spinner fa-spin"></i> : ""}
                                </button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );

    // Get all jobs by corpid
    function getAllJobs(corpid) {
        try {
            axios.get(`http://172.31.25.5:5000/jobs/${corpid}`)
                .then(jobs => {
                    // console.log(jobs.data[0].jobs);
                    setJobs(jobs.data[0].jobs);
                })
                .catch(err => console.log('Error: ' + err));
        } catch (error) {

        }
    }

    // Map through all the jobs
    function mapJobs() {
        return jobs.map(item => (
            <option value={`${item.title}/${item.job_id}/${item.dead_line}`}>{item.title}</option>
        ))
    }

}
export default NewContent;