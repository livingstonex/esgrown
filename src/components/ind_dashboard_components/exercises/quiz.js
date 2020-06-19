import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TimerComponent from './timer';
import { Card } from 'react-bootstrap';


const Quiz = (props) => {

    const [activeStep, setActiveStep] = useState(0);


    const finished = () => {
        console.log('finished')
    }
    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const { question, handelUserAns, submitAns, duration, setPage } = props;

    return (
        <>
            <div className="row">
                <div className="container text-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <Card style={{ marginLeft: '50%' }}>
                            <Card.Body>
                                {/* <span style={{ fontSize: '18px', fontWeight: 'bolder' }}>Number of Questions: {question ? question.length : ""}  */}
                                <Typography gutterBottom variant="" component="h5">
                                    Number of Questions: {question ? question.length : ""}
                                    {/* </span> */}
                                </Typography>
                                <Typography gutterBottom variant="" component="h6">
                                    <TimerComponent duration={duration} setPage={setPage} />
                                </Typography>
                            </Card.Body>
                        </Card>
                    </div><br />
                </div>
                <div className="container" style={{ background: '#53A6E7', width: '100%' }}>
                    <div className="d-flex justify-content-center align-items-center" style={{ background: 'red', width: '100%' }}>
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Stepper activeStep={activeStep}>
                                    {question ? question.map((q) => (
                                        <Step key={q.question}>
                                            <StepContent style={{ fontSize: '20px' }}>{q.question}</StepContent>
                                            <StepContent>
                                                <input type="hidden" value={q.question} />
                                                <Typography>
                                                    {q.options.map(a => {
                                                        let questionOptions;
                                                        if (q.correct_ans.length > 1) {
                                                            questionOptions = <div>
                                                                <input type="checkbox" value={a} data-score={q.score} onChange={handelUserAns} /> {a}
                                                            </div>
                                                        } else {
                                                            questionOptions = <div>
                                                                <input type="radio" name="ans" value={a} data-score={q.score} data-ans={q.correct_ans[0]} onChange={handelUserAns} /> {a}
                                                            </div>;
                                                        }

                                                        return questionOptions;
                                                    })}</Typography>
                                                <div className="">
                                                    <div>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={handleNext}
                                                            className=""
                                                            id={activeStep}
                                                        >
                                                            {activeStep === (question ? question.length - 1 : "") ? <span onClick={() => submitAns()}>Finish</span> : 'Next'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </StepContent>
                                        </Step>
                                    )) : ""}
                                </Stepper>
                                {activeStep === question ? question.length && (
                                    <Paper square elevation={0} className="">
                                        <Typography>All steps completed - you &apos;re finished</Typography>

                                        <Button
                                            className=""
                                            color="primary"
                                            variant="contained"
                                            onClick={submitAns}
                                            id="submit"
                                        >
                                            submit Ans
                                        </Button>
                                    </Paper>
                                ) : ""}
                            </Card.Body>
                        </Card>
                        {/* <span style={{ fontSize: '18px', color: '#E68824' }}>{countDown} Seconds left</span> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Quiz;