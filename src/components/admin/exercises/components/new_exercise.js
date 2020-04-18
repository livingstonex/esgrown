import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import { set } from 'mongoose';



const NewExercises = (props) => {

    const exUrl = `http://localhost:5000/excercise/add`;

    const [page, setPage] = useState(0)


    const [spinner, setSpinner] = useState(false);

    //Exercises
    const [extitle, setExTitle] = useState('');
    const [exduration, setExDuration] = useState('');

    //questions
    const [exId, setExId] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [ans, setAns] = useState([]);
    const [score, setScore] = useState('');
    const [totalQ, setTotalQ] = useState(0);

    //admin createing this exercise
    const [admin, setAdmin] = useState();


    //get logged in Admin
    useEffect(() => { 
        const admin = JSON.parse(sessionStorage.getItem("key"));
        setAdmin(admin.id)
    }, []);


    // question functions
    const handleOptions = (e) => {

        setOptions(e.target.value)
    }
    const handleAns = (e) => {
        setAns(e.target.value)
    }

    const handleQuestion = (e) => {
        setQuestion(e.target.value);
    }
    const handleScore = (e) => {
        const value = e.target.value;

        setScore(value);
    }
    // excercise_id, question, options, correct_ans, score
    // console.log(score)

    const createQuestion = () => {

        if (ans !== "" && options !== "" && score !== "" && question !== "") {
            setSpinner(true);

            const splitOptions = options.split(',');

            const splitAns = ans.split(',');

            const questionData = {
                excercise_id: exId,
                question: question,
                options: splitOptions,
                correct_ans: splitAns,
                score: score
            }

            axios.post(`http://localhost:5000/question/add`, questionData)
                .then(res => {
                    console.log(res.data);
                    setSpinner(false);
                    setAns('');
                    setQuestion('')
                    setOptions('')
                    setScore('')
                    setExId(res.data.excercise_id);

                    //get number of questions and display
                    axios.post(`http://localhost:5000/question/${res.data.excercise_id}`)
                    .then(res => setTotalQ(res.data.length))
                    .catch(err => console.log(err))

                })
                .catch(err => console.log(err));

            console.log(questionData);


        }

    }

    //exercise functions
    const handleExTitle = (e) => {
        const value = e.target.value;

        setExTitle(value);
    }

    const handleExDuration = (e) => {

        const value = e.target.value;

        setExDuration(value);
    }


    const createExercise = () => {

        const exData = {
            title: extitle,
            duration: exduration,
            service: props.service,
            admin_id: admin
        }

        if (extitle == "") {
            return

        } else if (exduration == "") {
            return

        } else {

            setSpinner(true);

            axios.post(exUrl, exData)
                .then(res => {
                    setExId(res.data._id);
                    setSpinner(false);
                    setPage(2)
                    console.log(res.data)
                })
                .catch(err => {
                    alert('oops ' + err);
                })
        }

        console.log(exData)

    }

    //page display logic
    const setExForm = () => {
        setPage(1)
    }
    const setQuesForm = () => {
        setPage(2)
    }

    return (
        <>
            <Card className="col col-lg-6 col-sm-6" style={{ overflow: 'scroll' }}>
                <CardContent>
                    <h6 style={{ textAlign: 'center' }}>{props.title}</h6>
                    <hr />

                    {
                        (page == 0) ?
                            <>
                                <div style={{ height: '100px' }}></div>
                                <button
                                    className="btn font-weight-bold mt-3 py-2 w-100 border-0"
                                    style={{ background: '#21A5E7', color: 'white' }}
                                    onClick={setExForm}
                                >
                                    Create Exercise
                            </button>
                            </>
                            : (page == 1) ?
                                <>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label style={{ fontWeight: 'bold' }}>Exercise Title</label>
                                            <input type="text" name="title" value={extitle} onChange={handleExTitle} placeholder="Exercise Title" className="form-control" required />
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col">
                                            <label style={{ fontWeight: 'bold' }}>Exercise Duration</label>
                                            <input type="number" name="duration" value={exduration} onChange={handleExDuration} placeholder="Time Allowed for this Exercise Eg 20" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <button
                                                className="btn font-weight-light mt-3 w-100 border-0"
                                                style={{ background: '#21A5E7', color: 'white' }}
                                                onClick={createExercise}
                                            >
                                                {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : "Create New Exercise"}
                                            </button>
                                        </div>
                                    </div>
                                </> :
                                (page == 2)
                                    ?
                                    <>
                                        <span style={{ fontWeight: 'bold' }}><u>Exercise: {extitle}</u></span><br />
                                        <span style={{ fontWeight: 'bold' }}><u>Number of questions: {totalQ}</u></span>
                                        <hr />
                                        <div className="row mt-3">
                                            <div className="col">
                                                <label style={{ fontWeight: 'bold' }}>Question</label>
                                                <input type="text" name="title" value={question} onChange={handleQuestion} placeholder="Question" className="form-control" required />
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col">
                                                <label style={{ fontWeight: 'bold' }}>Options</label>
                                                <textarea cols="5" rows="3" value={options} onChange={handleOptions} className="form-control" placeholder="Eg rice,beans,garri"></textarea>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col">
                                                <label style={{ fontWeight: 'bold' }}>Corrects Answer / Answers</label>
                                                <textarea cols="5" rows="3" value={ans} className="form-control" onChange={handleAns} placeholder="Eg rice,beans"></textarea>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col">
                                                <label style={{ fontWeight: 'bold' }}>Score</label>
                                                <input type="number" value={score} onChange={handleScore} className="form-control" placeholder="Eg 10" />
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col">
                                                <button
                                                    className="btn font-weight-light mt-3 w-100 border-0"
                                                    style={{ background: '#21A5E7', color: 'white' }}
                                                    onClick={createQuestion}
                                                >
                                                    {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : "Create Question"}
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                    : ""

                    }

                </CardContent>
            </Card>

        </>
    );
}

export default NewExercises;