import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class LmUpdateForm extends Component {

    state = {
        highestlevelOfEducation: '',
        natureOfBusiness: '',
        sub_status: false,
        user_id: '',
        message: ''
    }


    handleUpdate = () => {

        const data = {
            nature_of_work_business: this.state.natureOfBusiness,
            highest_level_of_education: this.state.highestlevelOfEducation
        }

        axios.post(`http://18.188.101.36/subscriptionlm/update/${this.state.user_id}`, data)
            .then(response => {
                if (response.status === 200) {
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

        axios.get(`http://18.188.101.36/subscriptionlm/${userData.id}`)
            .then(response => this.setState({
                highestlevelOfEducation: response.data[0].highest_level_of_education,
                natureOfBusiness: response.data[0].nature_of_work_business
            }))
            .catch(err => console.log(err));
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
                <Modal isOpen={isOpen} toggle={toggle} centered>
                    <ModalHeader>
                        <div style={{ float: 'left' }}><p style={{ font: 'verdana', fontSize: 18 }}>Leadership Management Subscription</p></div>
                        <div style={{ float: 'right', marginLeft: 300, marginTop: -45, paddingRight: 0 }}><Button style={{ float: 'right', backgroundColor: sub_statusColor, color: 'white' }}>{buttonText}</Button></div>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="highestlevelOfEducation">Highest level Of Education</Label>
                                <Input type="text"
                                    name="highestlevelOfEducation"
                                    value={this.state.highestlevelOfEducation}
                                    onChange={this.changeHandler}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="natureOfBusiness">Nature Of Work Or Business</Label>
                                <Input type="text"
                                    name="natureOfBusiness"
                                    value={this.state.natureOfBusiness}
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
export default LmUpdateForm;
