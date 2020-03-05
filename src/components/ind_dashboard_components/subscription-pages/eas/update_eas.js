import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class updateForm extends Component {

    state = {

        levelOfEducation: '',
        intendedStudy: '',

    }

    handleUpdate = (props) => {
        axios.post().then(response => console.log(response))
    }

    //make axios call to api and get data to be edited and store in state

    // axios.get()
    // .then(data => this.setState(levelOfEducation: data.levelOfEducation,intendedStudy:data.levelOfEducation)



    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="levelOfEducation">levelOfEducation</Label>
                    <Input type="text" value={this.state.levelOfEducation} onChange={levelOfEducation => this.setState({ levelOfEducation })} />
                </FormGroup>

                <FormGroup>
                    <Label for="intendedStudy">intendedStudy</Label>
                    <Input type="text" value={this.state.intendedStudy} onChange={intendedStudy => this.setState({ intendedStudy })} />
                </FormGroup>
                <Button onClick={this.update(this.state)}>Submit</Button>
            </Form>
           
        )

    }
}
export default updateForm;
