import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function ExcerciseRankings({page}){
    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem('key'));
        setUser(user)
        const id = user.id;
        //get all jobs
        getJobs(id);
    },[]);

    // States
    const [user, setUser] = useState();
    const [jobs, setJobs] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [answers, setAnswers] = useState([]);

    const onChangeJob = (e) => {
        const job_id = e.target.value;
        getAnswersByJob(user.id, job_id);
    }
    return(
        <React.Fragment >
            <div className="container">
                <div className="d-flex justify-content-center mt-4 mb-4">
                <h2 style={{marginTop:'70px', fontFamily:'quicksand'}}>Rankings Page</h2>
                </div>
                
                <div className="d-flex justify-content-center">
                    <select className="form-control text-small" onChange={onChangeJob} style={{width:'50%'}}>
                        <option value="null">Select the jobs to view Rankings</option>
                        { jobMap() }
                    </select>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    {/* Render Ranks here */}
                    { spinner ? <i className="fa fa-spinner fa-spin mt-5"></i> : ""}
                </div>
            </div>
        </React.Fragment>
    );

    // Get all jobs by company id
    function getJobs(id){
        try {
            axios.get(`http://localhost:5000/jobs/${id}`)
                .then(res => {
                    if (res.data.length !== 0) {
                        setJobs(res.data[0].jobs);
                        console.log(res.data[0].jobs)
                    } else {
                        console.log("no data")
                    }
                })
                .catch(err => console.log(err));
        } catch (error) {
            console.log(error);
        }
    }

    // Rank Card Function
    function rankCard(){
        return <div style={{height:'50px', width:'80%', background:'silver', }} className="d-flex justify-content-around align-items-center">
                    <div>John Okafor</div>
                    <div> 57% <div className="btn btn-info btn-sm ml-3">Induct</div></div>
               </div>
    }

    // Map jobs for selection
    function jobMap(){
        return jobs.map(item => (
            <option value={item.job_id}>{item.title}</option>
            ));
    }

    // Get all excercises that carry the Job id
    function getAnswersByJob(corpid, jobid){
        try {
            setSpinner(true);
            axios.get(`http://localhost:5000/answer/${corpid}/${jobid}`)
                    .then(answers => { 
                        setSpinner(false);
                        setAnswers(answers.data);
                    })
                    .catch(err => console.log(err));
        } catch (error) {
            
        }
    }


}