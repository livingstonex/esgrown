import React, { Component } from 'react';
import {
    Button,
    Form, FormGroup,
    Label, Input,
    Modal, ModalHeader,
    ModalBody, ModalFooter,
    InputGroup, InputGroupAddon,
    InputGroupText,
} from 'reactstrap';
import axios from 'axios';

class EasUpdateForm extends Component {

    state = {
        levelOfEducation: '',
        intendedStudy: '',
        sub_status: false,
        user_id: '',
        message: '',
        LOE: true,
        FIS: true
    }


    handleUpdate = (props) => {

        const { levelOfEducation, intendedStudy } = this.state;

        const id = this.state.user_id;


        const data = {
            levelofeducation: levelOfEducation,
            field_of_intended_study: intendedStudy
        }


        //make axios request to update db
        axios.post(`http://18.188.101.36/subscriptioneas/update/${id}`, data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ message: 'Subscription details updated successful' })
                }
            })
            .catch(err => console.log(err.message))


    }


    //get values to be updated
    componentDidMount() {
        const userData = JSON.parse(sessionStorage.getItem('key'));

        this.setState({ user_id: userData.id });


        axios.get(`http://18.188.101.36/subscriptioneas/${userData.id}`)
            .then(res => this.setState({
                levelOfEducation: res.data[0].levelofeducation,
                intendedStudy: res.data[0].field_of_intended_study,
                sub_status: res.data[0].sub_status

            }))

            .catch(err => err.message)

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
                        <div style={{ float: 'left' }}><p style={{ font: 'verdana', fontSize: 18 }}>Education Advisory Services Subscription</p></div>
                        <div style={{ float: 'right', marginLeft: 300, marginTop: -45, paddingRight: 0 }}><Button style={{ float: 'right', backgroundColor: sub_statusColor, color: 'white', border: sub_statusColor }}>{buttonText}</Button></div>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            {/* <FormGroup>
                                <Label for="levelOfEducation">Level Of Education</Label>
                                <Input type="text"
                                    name="levelOfEducation"
                                    value={this.state.levelOfEducation}
                                    onChange={this.changeHandler}
                                />
                            </FormGroup> */}
                            <Label for="levelOfEducation">Level Of Education</Label>
                            <InputGroup>
                                <Input type="select"
                                    name="levelOfEducation"
                                    value={this.state.levelOfEducation}
                                    onChange={this.changeHandler}
                                    disabled={this.state.LOE}
                                >
                                    <option>Level of Education</option>
                                    <option value="degree">Degree</option>
                                    <option value="masters">Masters</option>
                                    <option value="phd">Ph.D</option>
                                </Input>
                                <InputGroupAddon addonType="append">
                                    <Button style={{ background: 'lightgrey', border: 'none' }} onClick={() => this.setState({ LOE: !this.state.LOE })}>edit</Button>
                                </InputGroupAddon>
                            </InputGroup>
                            <br />
                            <Label for="intendedStudy">Field Of Intended Study</Label>
                            <InputGroup>
                                <Input type="text"
                                    name="intendedStudy"
                                    value={this.state.intendedStudy}
                                    onChange={this.changeHandler}
                                    disabled={this.state.FIS}
                                />
                                <InputGroupAddon addonType="append">
                                    <Button style={{ background: 'lightgrey', border: 'none' }} onClick={() => this.setState({ FIS: !this.state.FIS })}>edit</Button>
                                </InputGroupAddon>
                            </InputGroup>

                            {/* <FormGroup>
                                <Label for="intendedStudy">Field Of Intended Study</Label>
                                <Input type="text"
                                    name="intendedStudy"
                                    value={this.state.intendedStudy}
                                    onChange={this.changeHandler}
                                />
                            </FormGroup> */}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.message === 'Subscription details updated successful' ? <span style={{ color: 'green' }}>{this.state.message}</span> : <span style={{ color: 'red' }}>{this.state.message}</span>}
                        {' '}{''}
                        <Button style={{ background: '#1c8496', border: '#1c8496', color: 'white' }} onClick={this.handleUpdate}>Update</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )

    }
}


export default EasUpdateForm;
