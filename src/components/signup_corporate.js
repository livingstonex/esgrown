import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import localStorage from 'local-storage';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Row, Col, Card } from "react-bootstrap";


export default class IndividualSignUp extends Component{
    constructor(props){
        super(props);

        this.onChangeOrgname = this.onChangeOrgname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeDOI = this.onChangeDOI.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeType = this.onChangeType.bind(this);

        this.state = {
            org_name:'',
            email:'',
            password:'',
            phone:'',
            doi: new Date(),
            country:'',
            state:'',
            status: 'corporate',
            org_type: ''
        }
    }

    onChangeOrgname(e){
        this.setState({
            org_name: e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onChangePhone(e){
        this.setState({
            phone: e.target.value
        });
    }

    onChangeDOI(date){
        this.setState({
            doi: date
        });
    }

    onChangeCountry(e){
        this.setState({
            country: e.target.value
        });
    }

    onChangeState(e){
        this.setState({
            state: e.target.value
        });
    }

    onChangeType(e) {
        this.setState({ org_type: e.target.value });
        console.log(e.target.value)
    }

    
    onSubmit(e){
        e.preventDefault();

        const corporate = {
            org_name: this.state.org_name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            doi: this.state.doi,
            country: this.state.country,
            state: this.state.state,
            status: this.state.status,
            org_type: this.state.org_type
        }


        axios.post('http://localhost:5000/corporates/check_corp_email', corporate)
            .then(res => {
                if(res.data.length > 0){
                    //display a flash message that user already exists
                   alert("Corporate User Already Exists");
                   this.setState({
                    org_name:'',
                    email:'',
                    password:'',
                    phone:'',
                    doi: new Date(),
                    country:'',
                });
                }else{
                    axios.post('http://localhost:5000/corporates/add', corporate)
                            .then(res => {
                                const Global_CorpUser = {
                                    isLogged: true,
                                    id: res.data._id,
                                    name: res.data.org_name,
                                    email: res.data.email,                                   
                                    phone: res.data.phone,   
                                    doi: res.data.doi,
                                    country: res.data.country,
                                    state: res.data.state,
                                    status: res.data.status,
                                    org_type:res.data.org_type
                                    }
                                    
                                    //Save the Global_CorpUser in sessionStorage after stringifying it
                                    sessionStorage.setItem("key", JSON.stringify(Global_CorpUser));

                                    // const ds = JSON.parse(sessionStorage.getItem("corp_key"));
                                    // console.log(ds);
                                window.location = "/frontier";
                            })
                            .catch(err => console.log("Error is: " + err));

                       this.setState({
                        org_name:'',
                        email:'',
                        password:'',
                        phone:'',
                        doi: new Date(),
                        country:'',
                        state:''
                    });
                    
                }
            });
        
        
    }
    render(){
        return(
                <div className="container" >
                    <br/>
                    <h3 style={{'textAlign':'center', 'fontFamily':'gothic', 'color':'grey'}}>Create a Corporate Account</h3>
                    <Row>
                        <Col className="col-lg-3 col-md-3 col-sm-1 col-1"></Col>
                        <Col className="col-lg-6 col-md-6 col-sm-10 col-10">
                        <Card style={{'borderRadius':'5px'}}>
                            <Card.Header as="h5"><br/></Card.Header>
                            <Card.Body style={{'opacity':'0.7',}}>
                                <form onSubmit={this.onSubmit}>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="inputGroupSelect01">Organization Type</label>
                                        </div>
                                        <select class="custom-select" id="inputGroupSelect01" required onChange={this.onChangeType}>
                                            <option>Select...</option>
                                            <option value="school">School</option>
                                            <option value="company">Company</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Name of Organization:</label>
                                        <input className="form-control" required type="text" onChange={this.onChangeOrgname} value={this.state.org_name} placeholder="Enter name of Organization..."></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input className="form-control" required type="email" onChange={this.onChangeEmail} value={this.state.email} placeholder="Enter Email..."></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input className="form-control" required type="password" onChange={this.onChangePassword} value={this.state.password} placeholder="Enter Password..."></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Date of Incorporation:</label> <br/>
                                        <DatePicker selected={this.state.doi} onChange={this.onChangeDOI} required />
                                    </div>
                                    <Button className="btn btn-primary" type="submit">Sign Up</Button>
                                    <br/>
                                </form>
                            </Card.Body>
                        </Card>
                        <br/><br/>
                        </Col>
                        <Col className="col-lg-3 col-md-3 col-sm-1 col-1"></Col>
                    </Row>
                </div>
        );
    }
}