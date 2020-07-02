import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RMexercisesLog from '../components/exercise_log';
import RMexercisesNewContent from '../components/new_exercise';


const RMexercises = () => {

    const title = "RM Exercises Log";
    const NewContentTitle = "Create new RM Exercises and Questions";
    const service = "RM";

    const [ex, setEx] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const [user, setUser] = useState('');

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        setUser(user)
        //get exercises using corp id
        axios.get(`http://172.31.25.5:5000/excercise/${user.id}`)
            .then(res => {
                if (res.data.length > 0) {
                    // const rmEx = res.data.filter((ex) => {
                    //     return ex.service == "RM"
                    // });
                    setEx(res.data);
                    setSpinner(false);
                }
                console.log(res.data)
            })
            .catch(err => console.log(err));

    }, [])

    console.log(ex)

    const refreshContentLog = () => {

        //get exercises then using exercise id
        axios.get(`http://172.31.25.5:5000/excercise/${user.id}`)
            .then(res => {
                if (res.data.length > 0) {
                    const rmEx = res.data.filter((ex) => {
                        return ex.service == "RM"
                    });
                    setEx(res.data);
                    setSpinner(false);
                }
            })
            .catch(err => console.log(err));

    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <RMexercisesLog title={title} ex={ex} spinner={spinner} />
                    <RMexercisesNewContent service={service} title={NewContentTitle} refreshContentLog={refreshContentLog} />
                </div>
            </div>
        </>
    );
}
export default RMexercises;