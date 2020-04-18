import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LMexercisesLog from '../components/exercise_log';
import LMexercisesNewContent from '../components/new_exercise';


const LMexercises = () => {

    const title = "LM Exercises Log";
    const NewContentTitle = "Create new LM Exercises and Questions";
    const service = "LM";

    const [ex, setEx] = useState([]);
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        //get exercises then questions using exercise id
        axios.get(`http://localhost:5000/excercise/`)
            .then(res => {
                if (res.data.length > 0) {
                    const lmEx = res.data.filter((ex) => {
                        return ex.service == "LM"
                    });
                    setEx(lmEx);
                    setSpinner(false);
                }
            })
            .catch(err => console.log(err));

    }, [])
    return (
        <>
            <div className="container">
                <div className="row">
                    <LMexercisesLog title={title} ex={ex} spinner={spinner} />
                    <LMexercisesNewContent service={service} title={NewContentTitle} />
                </div>
            </div>
        </>
    );
}
export default LMexercises;