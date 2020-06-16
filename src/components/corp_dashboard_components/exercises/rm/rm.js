import React, {useState, useEffect } from 'react';
import axios from 'axios';
import RMexercisesLog from '../../../admin/exercises/components/exercise_log';
import RMexercisesNewContent from '../../../admin/exercises/components/new_exercise';


const RMexercises = () => {

    const title = "RM Exercises Log";
    const NewContentTitle = "Create new RM Exercises and Questions";
    const service = "RM";

    const [ex, setEx] = useState([]);
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        const comp = JSON.parse(sessionStorage.getItem('key'));
        //get exercises then questions using exercise id
        axios.get(`http://localhost:5000/excercise/activity/${comp.id}`)
            .then(res => {
                if (res.data) {
                    const rmEx = res.data.filter(ex => {
                        return ex.service === "RM"
                    });
                    setEx(rmEx);
                    setSpinner(false);
                }
            })
            .catch(err => console.log(err));

    }, [])
    
    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-around" style={{ marginTop: '100px' }}>
                    <RMexercisesLog title={title} ex={ex} spinner={spinner} />
                    <RMexercisesNewContent service={service} title={NewContentTitle} />
                </div>
            </div>
        </>
    );
}
export default RMexercises;