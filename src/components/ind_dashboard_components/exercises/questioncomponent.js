// // import React, { useState, useEffect } from 'react';
// // import Stepper from '@material-ui/core/Stepper';
// // import Step from '@material-ui/core/Step';
// // import StepContent from '@material-ui/core/StepContent';
// // import Button from '@material-ui/core/Button';
// // import Paper from '@material-ui/core/Paper';
// // import Typography from '@material-ui/core/Typography';
import Timer from 'react-timer';




// // export default class QuestionComponent{


// //     state = {
// //         activeStep:0,
// //         userAns:{},
// //         page:1,
// //     }                   
// //     // const [activeStep, setActiveStep] = useState(0);
// //     // const [userAns, setUserAns] = useState({})

// //     // const [page, setPage] = useState(1);
// //     //let [timeLeft, setTimeLeft] = useState();



// //     // useEffect(() => {

// //     //     if (timeLeft == 0) {
// //     //         setPage(3)
// //     //         document.getElementById('timer').style.display = 'none';
// //     //         return
// //     //     }

// //     //     const intervalId = setInterval(() => {
// //     //         setTimeLeft(timeLeft - 1);
// //     //     }, 1000);


// //     //     return () => clearInterval(intervalId);

// //     // }, [timeLeft]);




// //     // const currentCount = 10;
// //     // const timer = () => currentCount - 1;

// //     // useEffect(
// //     //     () => {
// //     //         if (currentCount <= 0) {
// //     //             return;
// //     //         }
// //     //         const id = setInterval(timer, 1000);
// //     //         return () => clearInterval(id);
// //     //     },
// //     //     [currentCount]
// //     // );
// //     let timeleft = 0;
// //     const questionTimer = setInterval((t) => {
// //         timeleft++;
// //         if (timeleft == 10) {
// //             // setTimeLeft(0);
// //             clearInterval(questionTimer);

// //             //document.getElementById("timer").innerHTML = "Finished";
// //         }
// //         else {
// //             timeleft++;
// //             //document.getElementById("timer").innerHTML = (10 - timeleft + " seconds remaining");
// //         }

// //         // document.getElementById("timer").innerHTML = (10 - timeleft + " seconds remaining");

// //     }, 1000);






// //     const handleNext = () => {
// //         setActiveStep(prevActiveStep => prevActiveStep + 1);
// //     };

// //     const setStart = () => {
// //         setPage(2)
// //         // setTimeLeft(20)
// //         // document.getElementById('timer').style.display = 'inline-block';

// //     }



// //     //question functions
// //     const handelUserAns = (e) => {

// //         let storedAns = localStorage.getItem('ans');

// //         storedAns = storedAns ? JSON.parse(storedAns) : [];

// //         storedAns.push({
// //             question: e.target.parentNode.parentNode.parentNode.firstChild.value,
// //             userAns: e.target.value
// //         })

// //         localStorage.setItem('ans', JSON.stringify(storedAns))


// //     }


// //     const submitAns = () => {
// //         const ans = localStorage.getItem('ans');
// //         setUserAns(ans)
// //         setPage(0)
// //         // (timeLeft)

// //         localStorage.removeItem('ans');

// //     }

// //     console.log(userAns);






// //     // components 
//     const StartBtn = () => {
//         return (
//             <>
//                 <div className="container">
//                     <div className="text-center" style={{ marginTop: '5%' }}>
//                         <h5>You have 50 seconds to answere all question. Click start when you are ready</h5>
//                     </div>
//                     <div className="text-center">
//                         <button className="btn btn-lg btn-primary" onClick={setStart}>Start Exercise</button>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     const Quiz = () => {

//         return (
//             <>
//                 <Stepper activeStep={activeStep}>
//                     {question.map((q) => (
//                         <Step key={q.question}>
//                             <StepContent style={{ fontSize: '20px' }}>{q.question}</StepContent>
//                             <StepContent>
//                                 <input type="hidden" value={q.question} />
//                                 <Typography>
//                                     {q.answer.map((a) => {
//                                         let ans;
//                                         if (q.correct_ans.length > 1) {
//                                             ans = <div>
//                                                 <input type="checkbox" value={a} onClick={handelUserAns} />{a}
//                                             </div>
//                                         } else {
//                                             ans = <div>
//                                                 <input type="radio" name="ans" value={a} onClick={handelUserAns} /> {a}
//                                             </div>;
//                                         }

//                                         return ans;
//                                     })}</Typography>
//                                 <div className="">
//                                     <div>

//                                         <Button
//                                             variant="contained"
//                                             color="primary"
//                                             onClick={handleNext}
//                                             className=""
//                                             id={activeStep}
//                                         >
//                                             {activeStep === question.length - 1 ? 'Finish' : 'Next'}
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </StepContent>
//                         </Step>
//                     ))}
//                 </Stepper>
//                 {activeStep === question.length && (
//                     <Paper square elevation={0} className="">
//                         <Typography>All steps completed - you &apos;re finished</Typography>

//                         <Button
//                             className=""
//                             color="primary"
//                             variant="contained"
//                             onClick={submitAns}
//                             id="submit"
//                         >
//                             submit Ans
//                     </Button>
//                     </Paper>
//                 )}
//                 {/* <Timer options={OPTIONS} /> */}
//             </>
//         );
//     }

//     const SubmitBtn = () => {

//         return (
//             <>
//                 <div className="container text-center" >
//                     <div style={{ marginTop: '5%' }}>
//                         <h6>You have exceeded your alloted time. Please click on the button to submit your answers</h6>
//                     </div>
//                     <div style={{}}>
//                         <Button
//                             style={{ background: '#21a5e7', border: '#21a5e7' }}
//                             variant="contained"
//                             onClick={submitAns}
//                             size="lg"
//                         >
//                             submit Answeres
//                         </Button>
//                     </div>
//                 </div>
//             </>
//         );
//     }


// //     //const question = [{ q: ['1950', '1970', '1960', '1978'], t: 'when was Nigeria independence', correct_ans: ['1960', '1920'] }, { q: ['place of worship', 'house', 'building', 'place'], t: 'what is church', correct_ans: ['place of worship'] }, { q: ['my house', 'my home', 'jos', 'james'], t: 'what is a moon', correct_ans: ['james'] }]
    
// // render(
// //     const { question } = this.props;

// //     const OPTIONS = { prefix: 'seconds elapsed!', delay: 1000 }
// //         return(
// //         <div className="">


// //             {
// //                 (page == 1) ? <StartBtn /> : (page == 2) ? <Quiz /> : (page == 3) ? <SubmitBtn /> : (page == 0) ? "" : ""
// //             }
            
// //             {/* <span id="timer" style={{ display: 'none' }}></span> */}

// //             </div>
// //         )
// //         );
// //     )
// // }

// // export { SubmitBtn,};