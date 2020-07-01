import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RMexercisesLog from '../../../admin/exercises/components/exercise_log';
import RMexercisesNewContent from '../../../admin/exercises/components/new_exercise';


const RMexercises = () => {

    const title = "RM Exercises Log";
    const NewContentTitle = "Create new RM Exercises and Questions";
    const service = "RM";

    const [ex, setEx] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const [user, setUser] = useState('');

    useEffect(() => {
        const comp = JSON.parse(sessionStorage.getItem('key'));
        setUser(comp);
        //get exercises then questions using exercise id
        axios.get(`http://18.188.101.36/excercise/${comp.id}`)
            .then(res => {
                if (res.data) {
                    setEx(res.data);
                    setSpinner(false);
                }
            })
            .catch(err => console.log(err));

    }, [])

    const refreshContentLog = () => {

        //get exercises then using exercise id
        axios.get(`http://18.188.101.36/excercise/${user.id}`)
            .then(res => {
                if (res.data.length > 0) {
                    setEx(res.data);
                    setSpinner(false);
                }
            })
            .catch(err => console.log(err));

    }

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-around" style={{ marginTop: '100px' }}>
                    <RMexercisesLog title={title} ex={ex} spinner={spinner} />
                    <RMexercisesNewContent service={service} title={NewContentTitle} refreshContentLog={refreshContentLog} />
                </div>
            </div>
        </>
    );
}
export default RMexercises;