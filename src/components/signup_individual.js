import React, { Component } from "react";
import { Link } from "react-router-dom";
import md5 from 'md5';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Row, Col, Card, Alert } from "react-bootstrap";


export default class IndividualSignUp extends Component {
    constructor(props) {
        super(props);

        this.onChangeFullname = this.onChangeFullname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeDOB = this.onChangeDOB.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeCorpType = this.onChangeCorpType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            fullname: '',
            email: '',
            password: '',
            gender: '',
            phone: '',
            dob: new Date(),
            country: '',
            state: '',
            status: 'individual',
            org_type: '',
            org_name: '',
            show: 'none'
        }
    }

    onChangeFullname(e) {
        this.setState({
            fullname: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onChangeDOB(date) {
        this.setState({
            dob: date
        });
    }

    onChangeCountry(e) {
        this.setState({
            country: e.target.value
        });
    }

    onChangeState(e) {
        this.setState({
            state: e.target.value
        });
    }
    onChangeCorpType(e) {
        this.setState({
            org_type: e.target.value,
            show: 'inline-block'
        });

    }

    onchangeCorpName = (e) => {
        this.setState({
            org_name: e.target.value
        })

    }

    onSubmit(e){
        e.preventDefault();

        const TIC = this.state.org_type === 'school' ? md5(this.state.email).substring(0, 8).toUpperCase() : null;
        
        const individual = {
            fullname: this.state.fullname,
            email: this.state.email,
            password: this.state.password,
            gender: this.state.gender,
            phone: this.state.phone,
            dob: this.state.dob,
            country: this.state.country,
            state: this.state.state,
            status: this.state.status,
            org_type: this.state.org_type ? this.state.org_type : null,
            org_name: this.state.org_name ? this.state.org_name : null,
            tic: TIC,
            sub_status:"InActive"
        }

        axios.post('http://localhost:5000/individuals/check_email', individual)
            .then(res => {
                if (res.data.length > 0) {
                    //display a flash message that user already exists
                    alert("User Already Exists");
                    this.setState({
                        fullname: '',
                        email: '',
                        password: '',
                        gender: '',
                        phone: '',
                        dob: new Date(),
                        country: '',
                        state: '',
                        org_type: '',
                        org_name: '',
                        show: 'none'
                    });
                } else {

                    axios.post('http://localhost:5000/individuals/add', individual)
                        .then(res => {
                            console.log("User Registration Successful: " + res.data.fullname);

                            const Global_User = {
                                isLogged: true,
                                id: res.data._id,
                                name: res.data.fullname,
                                email: res.data.email,
                                gender: res.data.gender,
                                phone: res.data.phone,
                                dob: res.data.dob,
                                country: res.data.country,
                                state: res.data.state,
                                status: res.data.status,
                                org_name: res.data.org_name,
                                org_type: res.data.org_type
                            }


                            //save user to session storage
                            sessionStorage.setItem("key", JSON.stringify(Global_User));

                            // window.location = "/individual_dashboard";
                            window.location = "/frontier";

                        })
                        .catch(err => console.log("Error is: " + err));

                    this.setState({
                        fullname: '',
                        email: '',
                        password: '',
                        gender: '',
                        phone: '',
                        dob: new Date(),
                        country: '',
                        state: '',
                    });
                }
            });


    }

    render() {
        return (
            <div className="container" >
                <br />
                <h3 style={{ 'textAlign': 'center', 'fontFamily': 'gothic', 'color': 'grey' }}>Create an Individual Account</h3>
                <Row>
                    <Col className="col-lg-3 col-md-3 col-sm-1 col-1"></Col>
                    <Col className="col-lg-6 col-md-6 col-sm-10 col-10">
                        <Card style={{ 'borderRadius': '5px' }}>
                            <Card.Header as="h5"><br /><Link to="/"> <span className="oi oi-arrow-left"></span> </Link></Card.Header>
                            <Card.Body style={{ 'opacity': '0.7', }}>
                                <form onSubmit={this.onSubmit}>
                                    <label>Name</label>
                                    <div className="input-group">
                                        <input className="form-control" required type="text" onChange={this.onChangeFullname}
                                            value={this.state.fullname} placeholder="Enter Fullname..."></input>
                                        {/* <input type="text" aria-label="First name" required className="form-control" placeholder="First Name..."/>
                                        <input type="text" aria-label="Last name" required className="form-control" placeholder="Last Name..."/> */}
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input className="form-control" required type="email" onChange={this.onChangeEmail} value={this.state.email} placeholder="Enter Email..."></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input className="form-control" required type="password" onChange={this.onChangePassword} value={this.state.password} placeholder="Enter Password..."></input>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="inputGroupSelect01">Gender</label>
                                        </div>
                                        <select class="custom-select" id="inputGroupSelect01" required onChange={this.onChangeGender} value={this.state.gender}  >
                                            <option selected="false">Select Gender...</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Date of Birth:</label> <br />
                                        <DatePicker selected={this.state.dob} onChange={this.onChangeDOB} required="true" />
                                    </div>

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="inputGroupSelect01">Organization</label>
                                        </div>
                                        <select class="custom-select" id="inputGroupSelect01" required onChange={this.onChangeCorpType}>
                                            <option selected="false">Where do you work</option>
                                            <option value="school">School</option>
                                            <option value="company">Company</option>
                                        </select>
                                        <span className="text-muted" style={{ fontSize: '12px' }}>This will help us provide appropriate content to you</span>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col" style={{ display: this.state.show }}>
                                            <input className="form-control" type="text" onChange={this.onchangeCorpName} value={this.state.org_name} placeholder={`Enter ${this.state.org_type} name...`}></input>
                                        </div>
                                    </div>
                                    <br />


                                    <Button className="btn btn-primary" type="submit">Sign Up</Button>
                                    <br />
                                </form>
                            </Card.Body>
                        </Card>
                        <br /><br />
                    </Col>
                    <Col className="col-lg-3 col-md-3 col-sm-1 col-1"></Col>
                </Row>
            </div>
        );
    }
}