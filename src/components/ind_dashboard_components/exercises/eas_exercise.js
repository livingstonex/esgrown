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
            return
        }

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);


        return () => clearInterval(intervalId);

    }, [timeLeft]);


    const setStart = () => {
        setPage(2)
        alert('started');
        setTimeLeft(5)
        document.getElementById('timer').display = 'show';

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
                <button className="btn btn-lg btn-primary" onClick={setStart}>Start Exercise</button>
            </>
        );
    }

    const Quiz = () => {
        return (
            <>
            <span style={{ fontSize: '18px' }}>Time alloted for this Quiz: 50 sec </span>
            <Stepper activeStep={activeStep} orientation="horizontal">
                {question.map((que) => (
                    <Step key={que.t}>
                        <StepContent style={{ fontWeight: 'bolder', fontStyle: 'italic', color: 'red' }}>Time alloted this question: 10 sec </StepContent>
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




        

    const question = [{ q: ['1950', '1970', '1960', '1978'], t: 'when was Nigeria independence', correct_ans: ['1960', '1920'] }, { q: ['place of worship', 'house', 'building', 'place'], t: 'what is church', correct_ans: ['place of worship'] }, { q: ['my house', 'my home', 'jos', 'james'], t: 'what is a moon', correct_ans: ['james'] }]


    return (
        <div className="">


            {
                (page == 1) ? <StartBtn /> : (page == 2) ? <Quiz /> : (page == 3) ? <Button color="primary" variant="contained" onClick={submitAns} id="submit">submit Ans</Button> : ""}

            <span id="timer" style={{display:'none'}}>{timeLeft}</span>
        </div>
    );
}

export default EASExercise;