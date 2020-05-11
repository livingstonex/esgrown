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
            currentCount: '',
            activeStep: 0,
            userAns: [],
            page: 1,
            spinner: true

        }

    }


    timer() {
        this.setState({
            currentCount: this.state.currentCount - 1
        })
        if (this.state.currentCount < 1) {
            clearInterval(this.intervalId);
            this.setState({ page: 3 })
        }
    }

    startTimer() {
        this.setState({ currentCount: this.props.duration });
        setInterval(this.timer.bind(this), 1000);
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 1000);

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
        this.startTimer()

    }

    handelUserAns = (e) => {

        if (e.target.type == 'radio') {
            const q = e.target.parentNode.parentNode.parentNode.firstChild.value;
            const a = e.target.value;

            if (userAnswer.length > 0) {
                const fnd = userAnswer.find(x => x.question == q);
                if (!fnd) {
                    userAnswer.push({
                        question: q,
                        ans: a
                    })
                } else {
                    userAnswer.splice(userAnswer.findIndex(item => item.question === q), 1)
                    userAnswer.push(
                        {
                            question: q,
                            ans: a
                        }
                    )
                }
            } else {
                userAnswer.push({
                    question: q,
                    ans: a
                })

            }
        } else {

        }

        this.setState({ userAns: userAnswer });

    }




    submitAns = () => {

        const userData = JSON.parse(sessionStorage.getItem('key'));
        const { name, email } = userData;

        const { exerciseId, service } = this.props;

        const data = {
            user_id: userData.id,
            excercise_id: exerciseId,
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
                    (this.state.page == 1) ? <StartBtn setStart={this.setStart} /> : (this.state.page == 2) ? <Quiz question={question} submitAns={this.submitAns} handelUserAns={this.handelUserAns} countDown={this.state.currentCount} /> : (this.state.page == 3) ? <SubmitBtn submitAns={this.submitAns} /> : (this.state.page == 0) ? "" : ""
                }



            </>
        );

    }

}
export default QuestionsComponent;