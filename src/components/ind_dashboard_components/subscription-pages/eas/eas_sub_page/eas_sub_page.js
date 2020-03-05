import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


import axios from 'axios';

class EasUpdateForm extends Component {

    state = {
        levelOfEducation: '',
        intendedStudy: '',
        sub_status: false
    }


    handleUpdate = (props) => {
        // axios.post().then(response => console.log(response))
        const { toggle } = this.props;
        toggle();

        this.setState({ levelOfEducation: '', intendedStudy: '' })

        const { levelOfEducation, intendedStudy } = this.state

        const data = {
            user_id: this.props.user.id,
            levelOfEducation: levelOfEducation,
            intendedStudy: intendedStudy
        }
        //make axios request to update db
    }

    //make axios call to api and get data to be edited and store in state

    componentWillMount() {
        // axios.get()
        // .then(response => this.setState(levelOfEducation: response.data.levelOfEducation,intendedStudy: response.data.intendedStudy).catch(err => err.message)
        console.log('making axios request')
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
                        Update your Info
                        <Button style={{ float: 'right', marginLeft: 280, backgroundColor: sub_statusColor, color: 'white' }}>{buttonText}</Button>
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
                                <Label for="intendedStudy">Field Of Intended Study</Label>
                                <Input type="text"
                                    name="intendedStudy"
                                    value={this.state.intendedStudy}
                                    onChange={this.changeHandler}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ background: '#1c8496', color: 'white' }} onClick={this.handleUpdate}>Update</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )

    }
}
export default EasUpdateForm;
