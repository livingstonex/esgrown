import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardActionArea, Typography, CardContent, CardActions } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import QuestionComponentRM from './questionscomponent';
import QuestionComponentLM from './questionscomponent';
import toast from '../../../util/toast';






const Exercises = ({ setRmExercisePage }) => {



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
    const [user, setUser] = useState();
    const [corpExerciseOwner, setCorpExerciseOwner] = useState();
    const [exId, setExId] = useState([])
    const [disabled, setDisabled] = useState(false)




    //get all exercises and filter for rm and lm
    useEffect(() => {

        const user = JSON.parse(sessionStorage.getItem('key'));

        if (user.sub_status_rm === 'active' && user.jobs.length != 0) {

            user.jobs.map(item => {
                axios.get(`http://localhost:5000/excercise/rm/${item.job_id}`)
                    .then(res => {
                        if (res.data.length !== 0) {
                            setExId(res.data)
                        }
                    }).catch(err => console.log(err))
            });



        }




        // //rm exercises
        // axios.get(`http://localhost:5000/excercise/rm/`)
        //     .then(res => {
        //         console.log(res.data)

        //         // const rm = res.data.filter((r) => {
        //         //     return r.service === "RM"
        //         // })

        //         // const lm = res.data.filter(l => {
        //         //     return l.service === 'LM'
        //         // })

        //         // setRMExercise(rm)
        //         // setLMExercise(lm)
        //         // setSpinner(false)
        //         // setCorpExerciseOwner(res.data.corp_id);
        //         // setJobID(res.data.job_id)
        //     })
        //     .catch(err => console.log(err));


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
    // console.log(corpExerciseOwner);

    //check service the user is subscribed to 
    useEffect(() => {

        //lm sub status
        const userData = JSON.parse(sessionStorage.getItem('key'))
        setUser(userData);

        setLMSubStatus(userData.sub_status_lm);

        setRMSubStatus(userData.sub_status_rm);


    }, [])

    const getQuestions = (e) => {

        const id = e.target.id;

        setExerciseId(id)
        setCurrentService(e.target.getAttribute('data-service'));
        setDuration(e.target.getAttribute('data-duration'));
        setDisplayQuestions(true)

    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col col-lg-12 col-sm-6">
                        <br />
                        <Card className="">

                            <CardContent>
                                <Typography gutterBottom variant="" component="h5">
                                    Recruitment Management - {""} {user && user.sub_status_rm === 'active' ? <span style={{ color: 'green' }}>{RMSubStatus}</span> : <span style={{ color: 'red' }}>{RMSubStatus}</span>}
                                    <hr />
                                </Typography>
                                {/* map through jobs and display cards  */}
                                <div className="d-flex justify-content-around">
                                    {mapJobs()}
                                </div>
                            </CardContent>


                            <CardActions style={{ background: '#e9ecef' }}>
                                <small>Note: You are only allowed to take a test only once</small>
                            </CardActions>
                        </Card>
                    </div>
                    {/* {displayQuestions && currentService == 'RM' ?
                        <div style={{ marginBottom: '200px', marginTop: '50px' }}>
                            <QuestionComponentRM duration={duration} exerciseId={exerciseId} service={currentService} corpExerciseOwner={corpExerciseOwner} jobID={JobID} />
                        </div>
                        : ''} */}


                    <div className="col col-lg-12 col-sm-6">
                        <br />
                        <Card className="">

                            <CardContent>
                                <Typography gutterBottom variant="" component="h5">
                                    Leadership Management - {""} {user && user.sub_status_lm == 'active' ? <span style={{ color: 'green' }}>{LMSubStatus}</span> : <span style={{ color: 'red' }}>{LMSubStatus}</span>}
                                    <hr />
                                </Typography>
                                {spinner ? <Spinner animation="grow" /> : LMSubStatus === "active" ? LMExercise.map(r => {
                                    return (
                                        <ul>
                                            <li className={`ui floating message`} data-service="LM" data-duration={r.duration} onClick={getQuestions} id={r._id} style={{ cursor: 'pointer', fontSize: '18px', fontStyle: 'italic' }}>{r.title}<br /><small>Duration: {r.duration} minutes</small></li>
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
                            <QuestionComponentLM duration={duration} exerciseId={exerciseId} service={currentService} corpExerciseOwner={corpExerciseOwner} />
                        </div>
                        : ''}

                </div>
            </div>

        </>

    );

    function mapJobs() {
        return exId.map(item => (
            <Card className="mt-5" style={{ width: '35%' }}>
                <CardActionArea>
                    <CardContent >
                        <Typography gutterBottom variant="" component="p">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <div className="btn btn-info bt-sm" onClick={() => setRmExercisePage(item)} disabled={{}} >Take Exercise </div>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                </CardActions>
            </Card>
        ));
    }



}
export default Exercises;