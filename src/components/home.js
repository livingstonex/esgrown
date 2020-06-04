import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../AuthContext";
import toast from '../util/toast';

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

    notify(message, type){ 
        return toast(message, type);
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
                                                <br/>
                                                <label style={{'fontWeight':'bold'}}>SignIn to your Account</label>
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
                                                
                                                        <Button  variant="primary btn-sm" type="submit" onClick={
                                                            (e)=>{
                                                                e.preventDefault();
                                                                const User = {
                                                                    email: this.state.email,
                                                                    password: this.state.password
                                                                }
                                                                // console.log(User);
                                                                // axios.post('http://localhost:5000/individuals/login', User)
                                                                //     .then(res => {
                                                                //         console.log("Then Running");
                                                                //         console.log( res );
                                                                //     }).catch(e => {
                                                                //         console.log("Catch Running");
                                                                //         console.log("Error:" + e);
                                                                //     });
                                                            // ==========================================
                                                                //Make a post to the api route for login
                                                                axios.post('http://localhost:5000/individuals/login', User)
                                                                    .then(res => {
                                                                    if(res.data.length > 0){
                                                                        console.log("data found")
                                                                        //UPDATE COMPONENT USER STATE HERE AND NAVIGATE TO THE DASHBOARD                                              
                                                                           context.setUserAuthData(true);

                                                                           if(res.data[0].status == 'individual'){
                                                                            // Register the individula user in session storage
                                                                            const GlobalUser = {
                                                                                isLogged: true,
                                                                                id: res.data[0]._id,
                                                                                email: res.data[0].email,
                                                                                name: res.data[0].fullname,  
                                                                                phone: res.data[0].phone,
                                                                                gender: res.data[0].gender,
                                                                                dos: res.data[0].dob,
                                                                                country: res.data[0].country,
                                                                                state: res.data[0].state,  
                                                                                status: res.data[0].status,
                                                                                lastLogin: res.data[0].lastLogin,
                                                                                org_type: res.data[0].org_type,
                                                                                sub_status_eas: res.data[0].sub_status_eas,
                                                                                sub_status_efa: res.data[0].sub_status_efa,
                                                                                sub_status_lm: res.data[0].sub_status_lm,
                                                                                sub_status_rm: res.data[0].sub_status_rm,
                                                                                sub_status_compt_mgt: res.data[0].sub_status_compt_mgt,

                                                                                }

                                                                                // Save Individual data to session Storage
                                                                                sessionStorage.setItem("key", JSON.stringify(GlobalUser));
                                                                                console.log(JSON.parse(sessionStorage.getItem("key")) );
                                                                                    this.setState({
                                                                                        email:'',
                                                                                        password:''
                                                                                        });
                                                                                window.location = "/frontier";
                                                                           }else{
                                                                            // Register the Corporate User in Session storage
                                                                            const Global_CorpUser = {
                                                                                isLogged: true,
                                                                                id: res.data[0]._id,
                                                                                name: res.data[0].org_name,
                                                                                email: res.data[0].email,
                                                                                phone: res.data[0].phone,
                                                                                doi: res.data[0].doi,
                                                                                country: res.data[0].country,
                                                                                state: res.data[0].state,
                                                                                status: res.data[0].status,
                                                                                org_type: res.data[0].org_type,
                                                                                sub_status_rm:res.data[0].sub_status_rm
            
                                                                            }
                                                                                // Save Individual data to session Storage
                                                                                sessionStorage.setItem("key", JSON.stringify(Global_CorpUser));
                                                                                console.log(JSON.parse(sessionStorage.getItem("key")) );
                                                                                    this.setState({
                                                                                        email:'',
                                                                                        password:''
                                                                                        });
                                                                                window.location = "/frontier";
                                                                           }
                                                                           

                                                                            
                                                                    }else{
                                                                        console.log("data not found");
                                                                        this.notify("Email or Password is wrong", "error");
                                                                    }
                                                                })
                                                                .catch(err => console.log("Error here is: "+err));

                                                                // =======================
                                                                }
                                                            }>
                                                        Login
                                                        </Button>
                                                       <br/>
                                                    <label>Forgot password? <Link to="/forgotPassword">Reset</Link></label>
                                                    <br/>
                                                    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                                                        <Button variant="primary btn-sm" >Create an Esgrown Account</Button>
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