import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../AuthContext";
import NavBar from './navbar';
import toast from '../util/toast';
import '../img/bg1.jpg';
import '../App.css';
import Card from './reusable/home_card/card';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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
            user:[{name:"", islogged:false, email:""}],
            loading: false
        }
    }

    // componentDidMount(){
    //     // Run jquery to load the slider
    //     $(document).ready(function(){
    //         $('.customer-logos').slick({
    //             slidesToShow: 6,
    //             slidesToScroll: 1,
    //             autoplay: true,
    //             autoplaySpeed: 1500,
    //             arrows: false,
    //             dots: false,
    //             pauseOnHover: false,
    //             responsive: [{
    //                 breakpoint: 768,
    //                 settings: {
    //                     slidesToShow: 4
    //                 }
    //             }, {
    //                 breakpoint: 520,
    //                 settings: {
    //                     slidesToShow: 3
    //                 }
    //             }]
    //         });
    //     });
    // }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    setLoading(){
        this.setState({
            loading: true
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
            'background-color':'grey',
            'opacity':'0.8',
            'font-family':'quicksand',
            'color':'white',
        };
        const formStyle = {
            'border':'1px solid',
            'border-radius':'5px',
            'background-color':'transparent',
            'opacity':'0.8',
            'color':'white',
        };
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay:true,
            centerMode:true,
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
                            <div className="bg">
                                <NavBar/>
                                {/* <div className="bg" style={{paddingRight:'50px', paddingLeft:'50px'}}> */}
                                <Container >
                                    <br/>
                                    <Row>
                                        <br/>
                                        <Col className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12" >
                                            <Container>
                                                <Jumbotron className="jumbo mt-2" style={styles}>
                                                    <p style={{fontFamily:'quicksand', fontSize:'15px', textAlign:'justify'}}>
                                                        Align education knowledge and skills needs for success; Access Education that equips you for life success; 
                                                        <br/><br/>
                                                        Access industry that needs knowledge and skills you have gained;
                                                        <br/><br/>
                                                        Build efficient workforce that meet your business knowledge and skill needs;
                                                        <br/><br/>
                                                        Management staff performance and lots more with
                                                    </p>
                                                    <h3>ESGROWN</h3>
                                                </Jumbotron>
                                            </Container>
                                        </Col>
                                        <Col className="col-xl-3 col-lg-3 col-md-1 col-sm-0 col-0"></Col>
                                        <Col className="col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12"  >
                                            <Container style={formStyle} >
                                                <br/>
                                                <label style={{'fontWeight':'bold'}}>SignIn to your Account</label>
                                                <Form >
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>Email address:</Form.Label>
                                                        <Form.Control type="email" required placeholder="Enter email" onChange={this.onChangeEmail} value={this.state.email} />
                                                            We'll never share your email with anyone else.
                                                        <Form.Text className="text-muted" style={{color:'white'}}>
                                                        </Form.Text>
                                                    </Form.Group>
                                                    <Form.Group controlId="formBasicPassword">
                                                        <Form.Label>Password:</Form.Label>
                                                        <Form.Control type="password" required placeholder="Password" onChange={this.onChangePassword} value={this.state.password} />
                                                    </Form.Group>
                                                    {/* variant="primary btn-sm" */}
                                                        <Button   type="submit" className="btn_submit mb-2" onClick={
                                                            (e)=>{
                                                                e.preventDefault();
                                                                const User = {
                                                                    email: this.state.email,
                                                                    password: this.state.password
                                                                }
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
                                                                                tic : res.data[0].tic
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
                                                           {this.loading ? <i className="fa fa-spinner fa-spin ml-2"></i> : ""}
                                                        </Button>
                                                      
                                                       <OverlayTrigger  trigger="click" placement="left" overlay={popover}>
                                                        {/* variant="primary btn-sm" */}
                                                            <Button  className="btn_submit mb-4" >Create an Esgrown Account</Button>
                                                        </OverlayTrigger>
                                                        <br/>
                                                        <label>Forgot password? <Link to="/forgotPassword">Reset</Link></label>
                                                </Form>
                                            </Container>
                                        </Col>
                                    </Row>
                                    
                                    <br/>
                                    <br/>
                                    </Container>
                                {/* </div> */}
                                </div>
                                
                                {/* Bottom content */}                                
                                <Slider {...settings} >
                                    <div>
                                            <Card imageUrl="https://www.unhcr.org/thumb1/5a1e75d74.jpg"/>
                                        </div>
                                        <div>
                                            <Card imageUrl="https://www.unhcr.org/thumb1/5a1e75d74.jpg"/>
                                        </div>
                                        <div>
                                            <Card imageUrl="https://www.unhcr.org/thumb1/5a1e75d74.jpg"/>
                                        </div>
                                        <div>
                                            <Card imageUrl="https://www.unhcr.org/thumb1/5a1e75d74.jpg"/>
                                        </div>
                                        <div>
                                            <Card imageUrl="https://www.unhcr.org/thumb1/5a1e75d74.jpg"/>
                                        </div>
                                        <div>
                                            <Card imageUrl="https://www.unhcr.org/thumb1/5a1e75d74.jpg"/>
                                    </div> 
                                </Slider>
                            </div>
                        )
                    }
                </AuthContext.Consumer>
        );
    }
}

                            {/* <div className="slider" style={{width:'100%'}}>
                                    <div className="d-flex justify-content-center">
                                        <div className="col-lg-4">
                                            <div className="d-flex justify-content-start align-items-center">
                                                <i className="fa fa-chevron-left"></i>
                                                <Card imageUrl="https://smallbusiness.findlaw.com/incorporation-and-legal-structures/corporate-structure-directors-to-shareholders/_jcr_content/pg/articleHeading/imageInLine.coreimg.jpeg"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-4"><Card imageUrl="https://www.unhcr.org/thumb1/5a1e75d74.jpg"/></div>
                                        <div className="col-lg-4">
                                            <div className="d-flex justify-content-start align-items-center">
                                                <Card imageUrl="https://unity.trustradius.com/wp-content/uploads/2018/09/tech-in-school.jpg"/>
                                                <i className="fa fa-chevron-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                {/* <div class="container">
                                    <section class="customer-logos slider">
                                        <div class="slide"><img src="https://image.freepik.com/free-vector/luxury-letter-e-logo-design_1017-8903.jpg"/></div>
                                        <div class="slide"><img src="http://www.webcoderskull.com/img/logo.png"/></div>
                                        <div class="slide"><img src="https://image.freepik.com/free-vector/3d-box-logo_1103-876.jpg"/></div>
                                        <div class="slide"><img src="https://image.freepik.com/free-vector/blue-tech-logo_1103-822.jpg"/></div>
                                        <div class="slide"><img src="https://image.freepik.com/free-vector/colors-curl-logo-template_23-2147536125.jpg"/></div>
                                        <div class="slide"><img src="https://image.freepik.com/free-vector/abstract-cross-logo_23-2147536124.jpg"/></div>
                                        <div class="slide"><img src="https://image.freepik.com/free-vector/football-logo-background_1195-244.jpg"/></div>
                                        <div class="slide"><img src="https://image.freepik.com/free-vector/background-of-spots-halftone_1035-3847.jpg"/></div>
                                        <div class="slide"><img src="https://image.freepik.com/free-vector/retro-label-on-rustic-background_82147503374.jpg"/></div>
                                    </section>
                                </div> */}


                                 {/* <div>
                                            <Card imageUrl="https://www.unhcr.org/thumb1/5a1e75d74.jpg"/>
                                        </div>
                                        <div>
                                            <Card imageUrl="https://www.unhcr.org/thumb1/5a1e75d74.jpg"/>
                                        </div>
                                        <div>
                                            <Card imageUrl="https://www.unhcr.org/thumb1/5a1e75d74.jpg"/>
                                        </div>
                                        <div>
                                            <Card imageUrl="https://www.unhcr.org/thumb1/5a1e75d74.jpg"/>
                                        </div>
                                        <div>
                                            <Card imageUrl="https://www.unhcr.org/thumb1/5a1e75d74.jpg"/>
                                        </div>
                                        <div>
                                            <Card imageUrl="https://www.unhcr.org/thumb1/5a1e75d74.jpg"/>
                                        </div> */}