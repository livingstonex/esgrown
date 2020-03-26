import React, {useState} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Quiz = (props) => {

const [activeStep, setActiveStep] = useState(0);


   const handleNext = () => {
       setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const { question, handelUserAns, submitAns, countDown } = props;
    return (
        <>
            <span style={{fontSize:'18px',fontWeight:'bolder'}}>Number of Questions: {question.length}</span>
            <Stepper activeStep={activeStep}>
                {question.map((q) => (
                    <Step key={q.question}>
                        <StepContent style={{ fontSize: '20px' }}>{q.question}</StepContent>
                        <StepContent>
                            <input type="hidden" value={q.question} />
                            <Typography>
                                {q.answer.map((a) => {
                                    let ans;
                                    if (q.correct_ans.length > 1) {
                                        ans = <div>
                                            <input type="checkbox" value={a} onChange={handelUserAns} />{a}
                                        </div>
                                    } else {
                                        ans = <div>
                                            <input type="radio" name="ans" value={a} onChange={handelUserAns} /> {a}
                                        </div>;
                                    }

                                    return ans;
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
                                        {activeStep === question.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === question.length && (
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
            )}
            <span style={{ fontSize: '18px', color: '#E68824' }}>{countDown} Seconds left</span>
        </>
    );
}

export default Quiz;