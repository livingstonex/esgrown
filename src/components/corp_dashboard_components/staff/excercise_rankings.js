import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ExcerciseRankings({ page }) {
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        getJobs(user.id);
        
    }, []);
    // const [jobId, setJobId] = useState("");
    const [data, setData] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [rank, setRank] = useState([]);

    let ranking = []

    const onChangeJob = (e) => {
        // setJobId(e.target.value);
        // Use the Job Id to make a call to get all answers
        const job_id = e.target.value;
        getAnswers(job_id);
    }
    console.log(rank);
    return (
        <React.Fragment >
            <div className="container">
                <div className="d-flex justify-content-center mt-4 mb-4">
                    <h2 style={{ marginTop: '70px', fontFamily: 'quicksand' }}>Rankings Page</h2>
                </div>

                <div className="d-flex justify-content-center">
                    <select className="form-control text-small" onChange={onChangeJob} style={{ width: '50%' }}>
                        <option value="null">Select the jobs to view Rankings</option>
                        { mapAllJobs() }
                    </select>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <div className="container align-self-center">
                        {/* Render Ranks here */}
                        {rankCard()}
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    );

    // Rank Card Function

    function rankCard() {
        return rank.map(item => (
            <div style={{ height: '50px', width: '80%', background: 'silver', }} className="d-flex justify-content-around align-items-center mb-3">
                <div>{item.name}</div>
                <div> {item.percentage}% <div className="btn btn-info btn-sm ml-3">Induct</div></div>
            </div>
        ));
    }
      
    // Get all answers by job_id
    function getAnswers(jobId) {

        try {
            axios.get(`http://localhost:5000/answer/job/${jobId}`)
                .then(res => {
                    console.log(res.data);

                    if (res.data.length > 0) {

                         res.data.map(item => {
                            //  Calculate percentage
                             const percentage = (item.total_scored / item.max_score) * 100;
                             
                            //  Define object to hold individuls percentage and name
                             const obj = {
                                 name: item.name,
                                 percentage: Math.floor(percentage),
                             };
                            //  setRank(rank.concat(obj))
                             ranking.push(obj);
                        });

                             setRank(ranking)

                    }
                    // setData(res.data);
                        
                })
                .catch(err => {
                    console.log(err);
                })
        } catch (error) {
            console.log(error);
        }
    }

        
    // Get all jobs by corp_id
    function getJobs(corpid) {
        try {
            axios.get(`http://localhost:5000/jobs/${corpid}`)
                .then(res => {
                    // console.log(res.data[0]);
                    setJobs(res.data[0].jobs);
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (error) {
            
        }
    }

    // map jobs function
    function mapAllJobs() {
        return jobs.map(item => (
            <option value={item.job_id}>{item.title}</option>
        ))
    }
}