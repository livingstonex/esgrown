import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



const EASExercise = () => {

    // const [question, setQuestion] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [userAns, setUserAns] = useState({})
    const [startTimer, setStartTimer] = useState(false)
    const [timer, setTimer] = useState(false)
    const [startQuiz, setStartQuiz] = useState(true)

    const [timeLeft, setTimeLeft] = useState();
    const [page, setPage] = useState(1);





    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    // const handleReset = () => {
    //     setActiveStep(0);
    // };

    useEffect(() => {

        if (timeLeft == 0) {
            setPage(3)
            document.getElementById('timer').style.display = 'none';
            return
        }

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);


        return () => clearInterval(intervalId);

    }, [timeLeft]);


    const setStart = () => {
        setPage(2)
        setTimeLeft(5)
        document.getElementById('timer').style.display = 'inline-block';

    }


    // if (timeLeft == 0) {
        
    // }



    //question functions
    const handelUserAns = (e) => {

        console.log(e.target.parentNode.parentNode.parentNode.firstChild.value);

        // console.log(e.target.parentNode.parentNode.parentNode.firstChild.value);
        console.log(e.target.value)

        var storedAns = localStorage.getItem('ans');

        storedAns = storedAns ? JSON.parse(storedAns) : [];

        storedAns.push({
            question: e.target.parentNode.parentNode.parentNode.firstChild.value,
            userAns: e.target.value
        })

        localStorage.setItem('ans', JSON.stringify(storedAns))


    }


    const submitAns = () => {

        var ans = localStorage.getItem('ans');
        setUserAns(ans)
        
        localStorage.removeItem('ans');

    }

    console.log(userAns);

    // useEffect(() => {
    //     axios(`https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple`)
    //         .then(res => {
    //             console.log(res.data)
    //             setQuestion(res.data);
    //         })
    //         .catch(err => console.log(err));
    // },[])

    // components 
    const StartBtn = () => {
        return (
            <>
                <div className="container">
                    <div className="text-center" style={{marginTop:'5%'}}>
                        <h5>You have 50 seconds to answere all Question. Click start when you are ready</h5>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-lg btn-primary" onClick={setStart}>Start Exercise</button>
                    </div>
                </div>
            </>
        );
    }

    const Quiz = () => {
        return (
            <>
            <Stepper activeStep={activeStep} orientation="horizontal">
                {question.map((que) => (
                    <Step key={que.t}>
                        <StepContent style={{ fontSize: '20px' }}>{que.t}</StepContent>
                        <StepContent>
                            <input type="hidden" value={que.t} />
                            <Typography>{que.q.map((a) => {
                                let ans;
                                if (que.correct_ans.length > 1) {
                                    ans = <div>
                                        <input type="checkbox" value={a} onClick={handelUserAns} />{a}
                                    </div>
                                } else {
                                    ans = <div>
                                        <input type="radio" name="ans" value={a} onClick={handelUserAns} /> {a}
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
            { activeStep === question.length && (
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
        </>
        );
    }

    const SubmitBtn = () => {

        return (
            <>
                <div className="container text-center" >
                    <div style={{ marginTop: '5%' }}>
                        <h6>You have exceeded your alloted time. Please click on the button to submit your answeres</h6>
                    </div>
                    <div style={{}}>
                        <Button 
                            style={{ background: '#21a5e7', border: '#21a5e7'}} 
                            variant="contained" 
                            onClick={submitAns}
                            size="lg" 
                        >
                            submit Answeres
                        </Button>
                    </div>
                </div>
            </>
        );
    }




        

    const question = [{ q: ['1950', '1970', '1960', '1978'], t: 'when was Nigeria independence', correct_ans: ['1960', '1920'] }, { q: ['place of worship', 'house', 'building', 'place'], t: 'what is church', correct_ans: ['place of worship'] }, { q: ['my house', 'my home', 'jos', 'james'], t: 'what is a moon', correct_ans: ['james'] }]


    return (
        <div className="">


            {
                (page == 1) ? <StartBtn /> : (page == 2) ? <Quiz /> : (page == 3) ? <SubmitBtn /> : ""
            }

            <span id="timer" style={{display:'none',color:'red',fontSize:'20px',fontStyle:'italic'}}>You have: {timeLeft} seconds Left</span>
        </div>
    );
}

export default EASExercise;