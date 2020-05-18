import React, { Component } from "react";
import { AuthContext } from "../AuthContext";
import {Link} from "react-router-dom";
import {Button, OverlayTrigger, Form, Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import toast from '../util/toast';


export default class CorporateLogin extends Component{
    constructor(props){
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email:'',
            password:''
        }
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

    onSubmit(e){
        
    }

    
    render(){
        const formStyle = {
            'border':'1px solid skyblue',
            'border-radius':'5px',
            'margin-top':'60px'
        };
        return (
            <AuthContext.Consumer>
                {
                    (context) => (

                <div>
                    <Row>
                        <Col className="col-xl-4 col-lg-4 col-md-3 col-sm-2 col-1" ></Col>
                        <Col>
                            <Container style={formStyle}>
                                    <br/>
                                        <label style={{'fontWeight':'bold'}}>Sign In to your Corporate Account</label>
                                        <Form>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email address:</Form.Label>
                                                <Form.Control type="email" required placeholder="Enter email"  onChange={this.onChangeEmail} value={this.state.email}/>
                                                <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password:</Form.Label>
                                                <Form.Control type="password" required placeholder="Password" onChange={this.onChangePassword} value={this.state.password} />
                                            </Form.Group>
                                            <Button variant="primary" type="submit" onClick={(e) => {
                                                e.preventDefault();

                                                const Corporate_User = {
                                                    email: this.state.email,
                                                    password: this.state.password
                                                }

                                        //Make a post to the api route for login
                                        axios.post('http://localhost:5000/corporates/login_corporate_email', Corporate_User)
                                            .then(res => {
                                                //console.log(res.data[0].password);
                                                if (res.data.length > 0) {
                                                    const cid = res.data[0]._id;
                                                    const cuser_name = res.data[0].org_name;
                                                    const cuser_email = res.data[0].email;
                                                    const cuser_phone = res.data[0].phone;
                                                    const cuser_doi = res.data[0].doi;
                                                    const cuser_country = res.data[0].country;
                                                    const cuser_state = res.data[0].state;
                                                    const cuser_status = res.data[0].status;
                                                    const org_type = res.data[0].org_type

                                                    console.log(res.data[0]);
                                                    console.log(Corporate_User.password);
                                                    const corp_user_data = {
                                                        email: res.data[0].email,
                                                        hash_password: res.data[0].password,
                                                        normal_password: Corporate_User.password
                                                    }
                                                    axios.post('http://localhost:5000/corporates/login_corporate', corp_user_data)
                                                        .then(res => {
                                                            console.log(res.data);
                                                            if (res.data == 1) {
                                                                // alert("Corporate Login Successfull");
                                                                toast("Corporate Login Successfull",'success')
                                                                //uPDATE CONTEXT AUTH DATA HERE AND NAVIGATE TO THE DASHBOARD
                                                                context.setUserAuthData(true);

                                                                
                                                                const Global_CorpUser = {
                                                                    isLogged: true,
                                                                    id: cid,
                                                                    email: cuser_email,
                                                                    name: cuser_name,
                                                                    phone: cuser_phone,
                                                                    dos: cuser_doi,
                                                                    country: cuser_country,
                                                                    state: cuser_state,
                                                                    status: cuser_status,
                                                                    org_type: org_type

                                                                }

                                                                sessionStorage.setItem("key", JSON.stringify(Global_CorpUser));
                                                                console.log(JSON.parse(sessionStorage.getItem("key")));

                                                                window.location = "/frontier";
                                                            } else {
                                                                // alert("Password wrong, please try again");
                                                                toast("Password wrong, please try again",'error')
                                                            }
                                                        })
                                                        .catch(error => toast(`Error is: "  ${error}`, 'error'));
                                                } else {
                                                    // alert("Your email address is not correct");
                                                    toast("Your email address is not correct",'warn')
                                                }
                                            })
                                            .catch(error => toast(`Error is: "  ${error}`, 'error'));
                                                

                                        //Reset the textfields to show blank by emptying the state
                                        this.setState({
                                            email: '',
                                            password: ''
                                        });
                                        
                                            }}>
                                                Login
                                                </Button>
                                                <br/>
                                            
                                            <label>Forgot password? <Link to="/forgotPassword">Reset</Link></label>
                                            <br/>
                                        </Form>
                                        <br/>
                                    </Container>
                                </Col>
                        <Col className="col-xl-4 col-lg-4 col-md-3 col-sm-2 col-1" ></Col>
                    </Row>
                    </div>
                )
            }
            </AuthContext.Consumer>

        );
    }
}