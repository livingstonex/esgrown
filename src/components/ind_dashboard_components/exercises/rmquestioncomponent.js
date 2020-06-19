import React, { Component } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Quiz from './quiz';
import SubmitBtn from './submitbtn';
import StartBtn from './startbtn';
import { toast } from 'react-toastify';



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
            disabled: false,
            exTaken: false,
            userName: ''
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

    checkIfUserHasTakenEx(user, exid) {
    //check if user has taken this exercise b4
    axios.post(`http://localhost:5000/answer/check`, {
        user_id: user,
        ex_id: exid
    }).then(res => {
        if (res.data.length > 0) {
            this.setState({exTaken:true});
            toast('Our records show you have taken this exercise before', 'warn')
        }
    }).catch(err => console.log(err))
}


    componentDidMount() {

        const user = JSON.parse(sessionStorage.getItem('key'));
        this.setState({userName: user.name})
        // this.intervalId = setInterval(this.timer.bind(this), 1000);
        axios.get(`http://localhost:5000/question/${this.props.exercise._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.length > 0) {
                    this.setState({
                        question: res.data,
                        spinner: false
                    })
                }
                if (res.data.length === 0) {
                    this.setState({disabled:true});
                    toast('sorry, no exercise yet!', 'info')
                }
            })
            .catch(err => console.log(err));
        
        if (this.state.spinner == false) {
            this.setState({ page: 1 })
        }

        this.checkIfUserHasTakenEx(user.id, this.props.exercise._id)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }


    setStart = () => {
        this.setState({ page: 2 })
        // this.startTimer()
    }

    setPage = () => {
        this.setState({ page: 3 })
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
                        userScore,
                        name:this.state.userName
                    })
                } else {
                    userAnswer.splice(userAnswer.findIndex(item => item.question === q), 1)
                    userAnswer.push(
                        {
                            question: q,
                            ans: a,
                            userScore,
                            name: this.state.userName

                        }
                    )
                }
            } else {
                userAnswer.push({
                    question: q,
                    ans: a,
                    userScore,
                    name: this.state.userName

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

        const { _id, service, corp_id, job_id, duration } = this.props.exercise;

        console.log(this.props.exercise);


        const data = {
            user_id: userData.id,
            corp_id: corp_id,
            excercise_id: _id,
            job_id: this.props.exercise.job_id,
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
        const { duration } = this.props.exercise;


        return (
            <>
                {
                    (this.state.page == 1) ? <StartBtn setStart={this.setStart} duration={this.props.duration} disabled={this.state.disabled} exTaken={this.state.exTaken}/> : (this.state.page == 2) ? <Quiz question={question} submitAns={this.submitAns} handelUserAns={this.handelUserAns} duration={duration} setPage={this.setPage} /> : (this.state.page == 3) ? <SubmitBtn submitAns={this.submitAns} /> : (this.state.page == 0) ? "" : ""
                }
            </>
        );

    }

}
export default QuestionsComponent;