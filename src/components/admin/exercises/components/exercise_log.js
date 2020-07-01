import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Accordion, Button, Card } from 'react-bootstrap';





const ExercisesLog = ({ ex, spinner, title }) => {

    const [ques, setQues] = useState([]);
    const [quesSpinner, setQuesSpinner] = useState(false)


    const getQuestions = (e) => {

        const id = e.target.id;
        setQuesSpinner(true)

        axios.get(`http://ec2-18-188-101-36.us-east-2.compute.amazonaws.com:5000/question/${id}`)
            .then(res => {
                setQues(res.data)
                setQuesSpinner(false)

            })
            .catch(err => console.log(err))
    }



    return (
        <>
            <Card style={{ padding: '5px', height: '800px', overflow: 'scroll', marginRight: '20px' }} className="col col-lg-5 col-sm-6">
                <h6 style={{ textAlign: 'center' }}>{title}</h6>
                {spinner ? <Spinner animation="grow" /> :
                    <Accordion defaultActiveKey="0">
                        {ex.map(data => {
                            return (
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} onClick={getQuestions} variant="link" id={data._id} eventKey={data._id}>
                                            {data.title}<br /><small style={{ fontSize: '13px' }}>Duration: {data.duration} Min</small>
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={data._id}>
                                        <Card.Body>
                                            <span style={{ color: '#97BA10', fontStyle: 'italic' }}>Number of Questions: {ques.length}</span>
                                            <hr />
                                            {quesSpinner ? <Spinner size="sm" animation="grow" />
                                                :
                                                ques.map(q => {
                                                    return (
                                                        <>
                                                            <p style={{ color: '#E8943F' }}>{q.question}</p>

                                                            <span style={{ color: '#E8943F', fontStyle: 'italic' }}><u>Options</u></span>

                                                            <ul>
                                                                {q.options.map(op => {
                                                                    return (
                                                                        <li>{op}</li>
                                                                    );
                                                                })}
                                                            </ul>
                                                            <span style={{ color: '#97BA10' }}>{"correct answer: " + q.correct_ans}</span>
                                                            <br />
                                                            <span style={{ color: '#97BA10' }}>{q.score + " marks"}</span>
                                                            <hr />
                                                        </>
                                                    );
                                                })
                                            }

                                        </Card.Body>

                                    </Accordion.Collapse>
                                </Card>
                            )
                        })}
                    </Accordion>}
            </Card>
        </>
    );
}

export default ExercisesLog;