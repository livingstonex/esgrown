import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import JobsModal from '../jobsmodal';


import axios from 'axios';

class RmUpdateForm extends Component {

    state = {
        highestlevelOfEducation: '',
        intendedStudy: '',
        sub_status: false,
        user_id: '',
        message: '',
        jobsModal: false,
    }


    handleUpdate = () => {

        const data = {
            highest_level_of_education: this.state.highestlevelOfEducation,
            field_of_training: this.state.intendedStudy,
        };

        //make axios request and update
        axios.post(`http://localhost:5000/subscriptionrm/update/${this.state.user_id}`, data)
            .then(response => {
                if (response.status == 200) {
                    this.setState({ message: 'Subscription details updated successful' })
                }
            })
            .catch(err => this.setState({ message: 'Update failed. Please try again' }))

    }

    //make axios call to api and get data to be edited and store in state
    // : : 
    componentDidMount() {
        const userData = JSON.parse(sessionStorage.getItem('key'));

        this.setState({ user_id: userData.id });

        if (userData.sub_status_rm == 'active') {
            this.setState({sub_status: 'active'})
        }

        console.log(userData);

        // axios.get(`http://localhost:5000/subscriptionrm/${userData.id}`)
        //     .then(response => this.setState({
        //         highestlevelOfEducation: response.data[0].highest_level_of_education,
        //         intendedStudy: response.data[0].field_of_training,
        //         sub_status: response.data[0].sub_status
        //     }))
        //     .catch(err => console.log(err))

    }

    closeModal = () => {
        this.setState({jobsModal: false})
    }



    changeHandler = event => {

        const name = event.target.name;

        const value = event.target.value;

        this.setState({ [name]: value });
    }


    render() {

        const { isOpen, toggle } = this.props;

        const sub_statusColor = this.state.sub_status === 'active' ? '#97ba0d' : '#e68723';

        const buttonText = this.state.sub_status === 'active' ? 'PAID' : 'PAY';

        return (

            <div>
                <Modal isOpen={isOpen} toggle={toggle} centered>
                    <ModalHeader>
                        <div style={{ float: 'left' }}><p style={{ font: 'verdana', fontSize: 18 }}>Recruitment Management Subscription</p></div>
                        <div style={{ float: 'right', marginLeft: 300, marginTop: -45, paddingRight: 0 }}><Button style={{ float: 'right', backgroundColor: sub_statusColor, color: 'white', border: sub_statusColor }}>{buttonText}</Button></div>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="highestlevelOfEducation">Highest Level Of Education</Label>
                                <Input type="text"
                                    name="highestlevelOfEducation"
                                    value={this.state.highestlevelOfEducation}
                                    onChange={this.changeHandler}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="intendedStudy">Field Of Training</Label>
                                <Input type="text"
                                    name="intendedStudy"
                                    value={this.state.intendedStudy}
                                    onChange={this.changeHandler}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.message === 'Subscription details updated successful' ? <span style={{ color: 'green' }}>{this.state.message}</span> : <span style={{ color: 'red' }}>{this.state.message}</span>}
                        {' '}{''}
                        <Button className="btn btn-sm btn-info" onClick={this.handleUpdate}>Update</Button>
                        {
                            this.state.sub_status == 'active' ?
                            <button className="btn btn-sm btn-info" style={{ background: '#21a5e7', border: '#21a5e7' }} onClick={() => this.setState({ jobsModal: !this.state.jobsModal })}>Add Job </button>
                                : ""
                        }
                        
                    </ModalFooter>
                </Modal>
                <JobsModal onHide={() => this.setState({ jobsModal: false })} show={this.state.jobsModal} closeModal={() => this.closeModal()} />
            </div >
        )
    }
}
export default RmUpdateForm;
