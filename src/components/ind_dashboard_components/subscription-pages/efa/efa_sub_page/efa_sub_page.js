import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


import axios from 'axios';

class EfaUpdateForm extends Component {

    state = {
        levelOfEducation: '',
        nextIntendedEductionLevel: '',
        filedOfStudy: '',
        sub_status: false,
        user_id: '',
        message: ''
    }


    handleUpdate = () => {

        const data = {
            levelofeducation: this.state.levelOfEducation,
            next_intended_education_level: this.state.nextIntendedEductionLevel,
            field_of_intended_study: this.state.filedOfStudy
        };

        //make axios request and update
        axios.post(`http://localhost:5000/subscriptionefa/update/${this.state.user_id}`, data)
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        message: 'Subscription details updated successful'
})
                }
            })
            .catch(err => this.setState({ message: 'Update failed. Please try again' }))



    }


    //make axios call to api and get data to be edited and store in state
    componentDidMount() {
        const userData = JSON.parse(sessionStorage.getItem('key'));

        this.setState({ user_id: userData.id });

        axios.get(`http://localhost:5000/subscriptionefa/${userData.id}`)
            .then(response => this.setState({
                levelOfEducation: response.data[0].levelofeducation,
                nextIntendedEductionLevel: response.data[0].next_intended_education_level,
                filedOfStudy: response.data[0].field_of_intended_study

            }))
            .catch(err => console.log(err.message))

    }



    changeHandler = event => {

        const name = event.target.name;

        const value = event.target.value;

        this.setState({ [name]: value });
    }


    render() {

        const { isOpen, toggle } = this.props;

        const sub_statusColor = this.state.sub_status === false ? '#ae2b26' : 'green';

        const buttonText = this.state.sub_status === false ? 'PAY' : 'PAID'
        return (

            <div>

                <Modal isOpen={isOpen} toggle={toggle} onHide={() => this.setState({ messsage: ' ' })} centered >
                    <ModalHeader>
                        <div style={{ float: 'left' }}><p style={{ font: 'verdana', fontSize: 18 }}>Education Finances Advisory Subscription</p></div>
                        <div style={{ float: 'right', marginLeft: 300, marginTop: -45, paddingRight: 0 }}><Button style={{ float: 'right', backgroundColor: sub_statusColor, color: 'white' }}>{buttonText}</Button></div>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="levelOfEducation">Level Of Education</Label>
                                <Input type="text"
                                    name="levelOfEducation"
                                    value={this.state.levelOfEducation}
                                    onChange={this.changeHandler}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="levelOfEducation">Next Intended Eduction Level</Label>
                                <Input type="text"
                                    name="nextIntendedEductionLevel"
                                    value={this.state.nextIntendedEductionLevel}
                                    onChange={this.changeHandler}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="intendedStudy">Filed Of Study</Label>
                                <Input type="text"
                                    name="filedOfStudy"
                                    value={this.state.filedOfStudy}
                                    onChange={this.changeHandler}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.message === 'Subscription details updated successful' ? <span style={{ color: 'green' }}>{this.state.message}</span> : <span style={{ color: 'red' }}>{this.state.message}</span>}
                        {' '}{''}
                        <Button style={{ background: '#1c8496', color: 'white' }} onClick={this.handleUpdate}>Update</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )

    }
}
export default EfaUpdateForm;
