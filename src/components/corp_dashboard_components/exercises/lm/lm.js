import React, {useState, useEffect } from 'react';
import axios from 'axios';
import LMexercisesLog from '../../../admin/exercises/components/exercise_log';
import LMexercisesNewContent from '../../../admin/exercises/components/new_exercise';


const LMexercises = () => {

    const title = "LM Exercises Log";
    const NewContentTitle = "Create new LM Exercises and Questions";
    const service = "LM";

    const [ex, setEx] = useState([]);
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        const comp = JSON.parse(sessionStorage.getItem('key'));
        //get exercises then questions using exercise id
        axios.get(`http://172.31.25.52/excercise/activity/${comp.id}`)
            .then(res => {
                if (res.data) {
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