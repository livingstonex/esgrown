import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardActionArea, Typography, CardContent, CardActions } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import QuestionComponentRM from './questionscomponent';
import QuestionComponentLM from './questionscomponent';






const Exercises = () => {



    const [spinner, setSpinner] = useState(true)

    const [RMExercise, setRMExercise] = useState([]);
    const [RMSubStatus, setRMSubStatus] = useState('');

    const [LMExercise, setLMExercise] = useState([]);
    const [LMSubStatus, setLMSubStatus] = useState('');

    const [questions, setQuestions] = useState([]);
    const [displayQuestions, setDisplayQuestions] = useState(false)

    const [duration, setDuration] = useState('');
    const [exerciseId, setExerciseId] = useState('');
    const [currentService, setCurrentService] = useState('')
    const [qspinner, setQSpinner] = useState(true);





    //get all exercises and filter for rm and lm
    useEffect(() => {

        //rm exercises
        axios.get(`http://localhost:5000/excercise`)
            .then(res => {

                const rm = res.data.filter((r) => {
                    return r.service === "RM"
                })
                setRMExercise(rm)
                setSpinner(false)
            })
            .catch(err => console.log(err));


        //lm exercise
        axios.get(`http://localhost:5000/excercise`)
            .then(res => {

                const lm = res.data.filter((r) => {
                    return r.service === "LM"
                })
                setLMExercise(lm)
                setSpinner(false)
            })
            .catch(err => console.log(err))



    }, []);


    //check service the user is subscribed to 
    useEffect(() => {

        //lm sub status
        const userData = JSON.parse(sessionStorage.getItem('key'))
        console.log(userData.id)
        axios.get(`http://localhost:5000/subscriptionlm/${userData.id}`)
            .then(res => {
                setLMSubStatus(res.data[0].sub_status)
            })
            .catch(err => console.log(err));

        //rm sub status
        axios.get(`http://localhost:5000/subscriptionrm/${userData.id}`)
            .then(res => {
                console.log('RM ' + res.data[0].sub_status)

                setRMSubStatus(res.data[0].sub_status);
            })
            .catch(err => console.log(err))


    }, [])

    const getQuestions = (e) => {

        const id = e.target.id;
        setExerciseId(id)
        setCurrentService(e.target.getAttribute('data-service'));
        setDuration(e.target.getAttribute('data-duration'));
        setDisplayQuestions(true)


        // console.log()

    }

    // console.log("the ques "+questions); 

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col col-lg-12 col-sm-6">
                        <br />
                        <Card className="">

                            <CardContent>
                                <Typography gutterBottom variant="" component="h5">
                                    Recruitment Management
                                        <hr />
                                </Typography>
                                {spinner ? <Spinner animation="grow" /> : RMSubStatus === "true" ? RMExercise.map(r => {
                                    return (
                                        <ul>
                                            <li className={`ui floating message`} data-service="RM" data-duration={r.duration} onClick={getQuestions} id={r._id} style={{ cursor: 'pointer', fontSize: '18px', fontStyle: 'itallic' }}>{r.title}<br /><small>Duration: {r.duration} minutes</small></li>
                                        </ul>
                                    );
                                }) : RMExercise.map(r => {
                                    return (
                                        <ul>
                                            <li id={r._id} style={{ cursor: 'pointer' }}>{r.title}</li>
                                        </ul>
                                    );
                                })}
                            </CardContent>


                            <CardActions style={{ background: '#e9ecef' }}>
                                <small>Note: You are only allowed to take a test only once</small>
                            </CardActions>
                        </Card>
                    </div>
                    {displayQuestions && currentService == 'RM' ?
                        <div style={{ marginBottom: '200px', marginTop: '50px' }}>
                            <QuestionComponentRM duration={duration} exerciseId={exerciseId} service={currentService} />
                        </div>
                        : ''}


                    <div className="col col-lg-12 col-sm-6">
                        <br />
                        <Card className="">

                            <CardContent>
                                <Typography gutterBottom variant="" component="h5">
                                    Recruitment Management
                                        <hr />
                                </Typography>
                                {spinner ? <Spinner animation="grow" /> : LMSubStatus === "true" ? LMExercise.map(r => {
                                    return (
                                        <ul>
                                            <li className={`ui floating message`} data-service="LM" data-duration={r.duration} onClick={getQuestions} id={r._id} style={{ cursor: 'pointer', fontSize: '18px', fontStyle: 'itallic' }}>{r.title}<br /><small>Duration: {r.duration} minutes</small></li>
                                        </ul>
                                    );
                                }) : LMExercise.map(r => {
                                    return (
                                        <ul>
                                            <li id={r._id} style={{ cursor: 'pointer' }}>{r.title}</li>
                                        </ul>
                                    );
                                })}
                            </CardContent>


                            <CardActions style={{ background: '#e9ecef' }}>
                                <small>Note: You are only allowed to take a test only once</small>
                            </CardActions>
                        </Card>
                    </div>
                    {displayQuestions && currentService == 'LM' ?
                        <div style={{ marginBottom: '200px', marginTop: '50px' }}>
                            <QuestionComponentLM duration={duration} exerciseId={exerciseId} service={currentService} />
                        </div>
                        : ''}

                </div>
            </div>
            {/* <span id="timer">{timeLeft}</span> */}

        </>

    );

}
export default Exercises;