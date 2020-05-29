import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../AuthContext";

import {Container, Col, Row, Form, Button, Jumbotron, Popover, OverlayTrigger} from "react-bootstrap";


export default class Home extends Component{
    
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            user:[{name:"", islogged:false, email:""}]
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
        // e.preventDefault();
        // const User = {
        //     email: this.state.email,
        //     password: this.state.password
        // }

        
        // //Make a post to the api route for login
        // axios.post('http://localhost:5000/individuals/login_email', User)
        //         .then(res => {
        //             //console.log(res.data[0].password);
        //             if(res.data.length > 0){
        //                 console.log(res.data[0]);
        //                 console.log(User.password);
        //                 const user_data = {
        //                     email: res.data[0].email,
        //                     hash_password:res.data[0].password,
        //                     normal_password: User.password
        //                 }
        //                 axios.post('http://localhost:5000/individuals/login', user_data)
        //                         .then(res => {
        //                             console.log(res.data);
        //                             if(res.data == 1){
        //                                 alert("Login Successfull");
        //                                 //UPDATE COMPONENT USER STATE HERE AND NAVIGATE TO THE DASHBOARD
        //                                 // const auth_data = {
        //                                 //     name: res.data[0].name,
        //                                 //     isLogged: true,
        //                                 //     email: res.data[0].email
        //                                 // }
        //                                 this.state.user[0].name = "goldiee"
        //                             }else{
        //                                 alert("Password wrong, please try again");
        //                             }
        //                         })
        //                         .catch(err => console.log("Error here is: "+err));
        //             }else{
        //                 alert("Your email address is not correct");
        //             }
        //         })
        //         .catch(error => {console.log("Error is: " + error)});
        // this.setState({
        //     email:'',
        //     password:''
        // });
    }
    render(){
         //Styles
        const styles = {
            'background-color':'skyblue',
            'opacity':'0.8',
            'font-family':'verdana',
            'color':'white',
        };
        const formStyle = {
            'border':'1px solid skyblue',
            'border-radius':'5px'
        };

        // Popover's rendering
        const popover = (
            <Popover id="popover-basic">
              <Popover.Title as="h3" style={{'font-family':'gothic'}}>Which account type do want to create?</Popover.Title>
              <Popover.Content>
                <Row>
                    <Col>
                        <Link to="/signup_individual">
                            <Button variant="info" className="btn-sm">Individual</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to="/signup_corporate">
                            <Button variant="info" className="btn-sm">Corporate</Button>
                        </Link>
                    </Col>
                </Row>
              </Popover.Content>
            </Popover>
          );

         
        return(
                <AuthContext.Consumer>
                    {
                        (context) => (
                            <div>
                                <Container>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <Row>
                                        <br/>
                                        <Col className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" >
                                            <Container>
                                                <Jumbotron className="jumbo" style={styles}>

                                                    <h6>Align education knowledge and skills needs for success;  
                                                        { context.state.name } 
                       
                                                        <br/>
                                                        Access Education that equips you for life success; 
                                                        <br/>
                                                        <br/>
                                                        Access industry that needs knowledge and skills you have gained;
                                                        <br/><br/>
                                                        Build efficient workforce that meet your business knowledge and skill needs;
                                                        <br/><br/>
                                                        Management staff performance and lots more with
                                                    </h6>
                                                    <h3>ESGROWN</h3>
                                                </Jumbotron>
                                            </Container>
                                        </Col>
                                        <Col className="col-xl-2 col-lg-2 col-md-1 col-sm-0 col-0"></Col>
                                        <Col className="col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12"  >
                                            <Container style={formStyle} >
                                                <br/>
                                                <label style={{'fontWeight':'bold'}}>Sign In to your Individual Account</label>
                                                <Form >
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>Email address:</Form.Label>
                                                        <Form.Control type="email" required placeholder="Enter email" onChange={this.onChangeEmail} value={this.state.email} />
                                                        <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                        </Form.Text>
                                                    </Form.Group>
                                                    <Form.Group controlId="formBasicPassword">
                                                        <Form.Label>Password:</Form.Label>
                                                        <Form.Control type="password" required placeholder="Password" onChange={this.onChangePassword} value={this.state.password} />
                                                    </Form.Group>
                                                
                                                        <Button  variant="primary" type="submit" onClick={
                                                            (e)=>{
                                                                e.preventDefault();
                                                                const User = {
                                                                    email: this.state.email,
                                                                    password: this.state.password
                                                                }

                                                                //Make a post to the api route for login
                                                                // axios.post('http://localhost:5000/individuals/login_email', User)
                                                                //         .then(res => {
                                                                //             //console.log(res.data[0]._id);
                                                                //             if(res.data.length > 0){
                                                                //                 const id = res.data[0]._id;
                                                                //                 const user_name = res.data[0].fullname;
                                                                //                 const user_email = res.data[0].email;
                                                                //                 const user_phone = res.data[0].phone;
                                                                //                 const user_gender = res.data[0].gender;
                                                                //                 const user_dob = res.data[0].dob;
                                                                //                 const user_country = res.data[0].country;
                                                                //                 const user_state = res.data[0].state;
                                                                //                 const user_status = res.data[0].status;
                                                                //                 const lastLogin = res.data[0].lastLogin;
                                                                //                 const org_type = res.data[0].org_type;
                                                                //                 const sub_status = res.data[0].sub_status;
                                                                //                 const sub_code = res.data[0].sub_code;


                                                                //                 //console.log(User.password);
                                                                //                 const user_data = {
                                                                //                     email: res.data[0].email,
                                                                //                     hash_password:res.data[0].password,
                                                                //                     normal_password: User.password
                                                                //                 }
                                                                //                 axios.post('http://localhost:5000/individuals/login', user_data)
                                                                //                         .then(res => {
                                                                //                             if(res.data == 1){
                                                                //                                 alert("Login Successfull");
                                                                                                
                                                                //                                 //UPDATE COMPONENT USER STATE HERE AND NAVIGATE TO THE DASHBOARD                                              
                                                                //                                context.setUserAuthData(true);
                                                                                              
                                                                //                                const GlobalUser = {
                                                                //                                 isLogged: true,
                                                                //                                 id: id,
                                                                //                                 email: user_email,
                                                                //                                 name: user_name,  
                                                                //                                 phone: user_phone,
                                                                //                                 gender: user_gender,
                                                                //                                 dos: user_dob,
                                                                //                                 country: user_country,
                                                                //                                 state: user_state,  
                                                                //                                 status: user_status,
                                                                //                                 lastLogin: lastLogin,
                                                                //                                 org_type: org_type,
                                                                //                                 sub_status: sub_status
                                                                //                                 }
                                                                                             
                                                                //                                sessionStorage.setItem("key", JSON.stringify(GlobalUser));
                                                                //                                console.log(JSON.parse(sessionStorage.getItem("key")) );

                                                                //                                window.location = "/frontier";
                                                                //                             }else{
                                                                //                                 alert("Password wrong, please try again");
                                                                //                             }
                                                                //                         })
                                                                //                         .catch(err => console.log("Error here is: "+err));
                                                                //             }else{
                                                                //                 alert("Your email address is not correct");
                                                                                
                                                                //             }
                                                                //         })
                                                                //         .catch(error => {console.log("Error is: " + error)});
                                                                        this.setState({
                                                                            email:'',
                                                                            password:''
                                                                        });
                                                                }
                                                            }>
                                                        Login
                                                        </Button>
                                                        <br/>
                                                        <Form.Text className="text-muted">
                                                        Are you a Corporate body? Login here:
                                                        </Form.Text>
                                                        <Link to="/corporate_login">
                                                            <Button className="btn btn-primary btn-sm" variant="primary" style={{ 'font-size':'14px'}}>
                                                                Corporate Login
                                                            </Button>
                                                        </Link>
                                                    <br/>
                                                    <label>Forgot password? <Link to="/forgotPassword">Reset</Link></label>
                                                    <br/>
                                                    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                                                        <Button variant="primary btn-sm" >Create and Esgrown Account</Button>
                                                    </OverlayTrigger>
                                                </Form>
                                                <br/>
                                            </Container>
                                        </Col>
                                    </Row>
                                    
                                    <br/>
                                    <br/>
                                </Container>
                            </div>
                        )
                    }
                </AuthContext.Consumer>
        );
    }
}