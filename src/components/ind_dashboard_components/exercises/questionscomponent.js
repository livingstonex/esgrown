import React, { Component } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Quiz from './quiz';
import SubmitBtn from './submitbtn';
import StartBtn from './startbtn';



let userAnswer = [];


class QuestionsComponent extends Component {
    //userAnswer = [];
    constructor(props) {

        super(props);

        this.state = {
            currentCount: this.props.duration + 1,
            activeStep: 0,
            userAns: [],
            page: 1,
            spinner: true,
        }

    }


    // timer() {
    //     this.setState({
    //         currentCount: this.state.currentCount - 1
    //     })
    //     if (this.state.currentCount < 1) {
    //         clearInterval(this.intervalId);
    //         this.setState({ page: 3 })
    //     }
    // }

    // startTimer() {
    //     this.setState({ currentCount: this.props.duration * 60 });
    //     setInterval(this.timer.bind(this), 1000);
    // }

    componentDidMount() {
        // this.intervalId = setInterval(this.timer.bind(this), 1000);

        //get questions
        axios.post(`http://localhost:5000/question/${this.props.exerciseId}`)
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        question: res.data,
                        spinner: false
                    })
                }
            })
            .catch(err => console.log(err));

        if (this.state.spinner == false) {
            this.setState({ page: 1 })
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }


    setStart = () => {
        this.setState({ page: 2 })
        // this.startTimer()
    }

    setPage = () => {
        this.setState({page: 3})
    }

    handelUserAns = (e) => {
        //check if user ans is correct ie user ans should be equal to question correct ans. if correct user score is equal to quetion.score else 0. add user score to the posted object
        if (e.target.type == 'radio') {
            const q = e.target.parentNode.parentNode.parentNode.firstChild.value;
            const a = e.target.value;
            const score = e.target.getAttribute('data-score');
            const correctAns = e.target.getAttribute('data-ans')
            let userScore;

            if (a === correctAns) {
                userScore = score
            } else {
                userScore = 0;
            }

            if (userAnswer.length > 0) {
                const fnd = userAnswer.find(x => x.question == q);
                if (!fnd) {
                    userAnswer.push({
                        question: q,
                        ans: a,
                        userScore
                    })
                } else {
                    userAnswer.splice(userAnswer.findIndex(item => item.question === q), 1)
                    userAnswer.push(
                        {
                            question: q,
                            ans: a,
                            userScore

                        }
                    )
                }
            } else {
                userAnswer.push({
                    question: q,
                    ans: a,
                    userScore

                })

            }
        } else {

        }

        this.setState({ userAns: userAnswer });

    }




    submitAns = () => {
        //attache corp id along with ans
        const userData = JSON.parse(sessionStorage.getItem('key'));
        const { name, email } = userData;

        const { exerciseId, service, corpExerciseOwner, jobID } = this.props;

        const data = {
            user_id: userData.id,
            corp_id: corpExerciseOwner,
            excercise_id: exerciseId,
            job_id: jobID,
            service: service,
            name: name,
            email: email,
            answers: this.state.userAns

        }

        //send to db
        axios.post(`http://localhost:5000/answer/add`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err))


        this.setState({ page: 0 })

    }


    render() {

        const { question, spinner } = this.state


        return (
            <>
                {
                    (this.state.page == 1) ? <StartBtn setStart={this.setStart} duration={this.props.duration} /> : (this.state.page == 2) ? <Quiz question={question} submitAns={this.submitAns} handelUserAns={this.handelUserAns} duration={this.props.duration} setPage={this.setPage} /> : (this.state.page == 3) ? <SubmitBtn submitAns={this.submitAns} /> : (this.state.page == 0) ? "" : ""
                }
            </>
        );

    }

}
export default QuestionsComponent;