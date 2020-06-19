import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ExcerciseRankings({ page }) {
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        getAnswers(user.id);
    }, []);
    const [exId, setExId] = useState("");
    const [data, setData] = useState([]);

    const onChangeExId = (e) => {
        setExId(e.target.value);
    }
    return (
        <React.Fragment >
            <div className="container">
                <div className="d-flex justify-content-center mt-4 mb-4">
                    <h2 style={{ marginTop: '70px', fontFamily: 'quicksand' }}>Rankings Page</h2>
                </div>

                <div className="d-flex justify-content-center">
                    <select className="form-control text-small" onChange={onChangeExId} style={{ width: '50%' }}>
                        <option value="null">Select the jobs to view Rankings</option>
                        <option>Job 1</option>
                        <option>Job 2</option>
                        <option>Job 3</option>
                    </select>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    {/* Render Ranks here */}
                    {rankCard()}
                </div>
            </div>
        </React.Fragment>
    );

    // Rank Card Function

    function rankCard() {
        return <div style={{ height: '50px', width: '80%', background: 'silver', }} className="d-flex justify-content-around align-items-center">
            <div>John Okafor</div>
            <div> 57% <div className="btn btn-info btn-sm ml-3">Induct</div></div>
        </div>
    }

    // Get all answers by corp_id
    function getAnswers(id) {
        try {
            axios.get(`http://localhost:5000/answer/${id}`)
                .then(res => {
                    console.log(res.data);
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        } catch (error) {
            console.log(error);
        }
    }
}