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
    const [q2userAns, setQ2UserAns] = useState("")
    const [q3userAns, setQ3UserAns] = useState("")
    const [q4userAns, setQ4UserAns] = useState("")
    const [q5userAns, setQ5UserAns] = useState("")



    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    // const handleReset = () => {
    //     setActiveStep(0);
    // };




    //question functions
    const handelUserAns = (e) => {

        console.log(e.target.parentNode.parentNode.parentNode.firstChild.value);

        // console.log(e.target.parentNode.parentNode.parentNode.firstChild.value);
        console.log(e.target.value)

        var storedAns = localStorage.getItem('ans');

        storedAns = storedAns ? JSON.parse(storedAns) : [];

        storedAns.push( {
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
    // setTimeout( ()=> { alert("Hello"); }, 3000);

    const question = [{ q: ['1950', '1970', '1960', '1978'], t: 'when was Nigeria independence', correct_ans: ['1960', '1920'] }, { q: ['place of worship', 'house', 'building', 'place'], t: 'what is church', correct_ans: ['place of worship'] }, { q: ['my house', 'my home', 'jos', 'james'], t: 'what is a moon', correct_ans: ['james'] }]
    

    return (
        <div className="">

            <Stepper activeStep={activeStep} orientation="horizontal">
                {question.map((que) => (
                    <Step key={que.t}>
                        <StepContent>{que.t}</StepContent>
                        <StepContent>
                            <input type="hidden" value={que.t} />
                            <Typography>{que.q.map((a) => {
                                let ans;
                                if(que.correct_ans.length > 1){
                                    ans = <div>
                                            <input type="checkbox" value={a} onClick={handelUserAns} />{a}
                                        </div>
                                } else {
                                    ans =  <div>
                                            <input type="radio" name="ans" value={a} onClick={handelUserAns} /> {a}
                                        </div>;
                                }
                                    
                                return ans;
                            })}</Typography>
                            <div className="">
                                <div>
                                    {/* <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className=""
                                    >
                                        Back
                                    </Button> */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className=""
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
                        onClick
                        className=""
                        color="primary"
                        variant="contained"
                        onClick={submitAns}
                    >
                        submit Ans
                    </Button>
                </Paper>
            )}
        </div>
    );
}

export default EASExercise;