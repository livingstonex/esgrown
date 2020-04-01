import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";

import { Container, Col, Row, Form, Button, Jumbotron, Popover, OverlayTrigger } from "react-bootstrap";


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }



    render() {
        //Styles
        const styles = {
            'background-color': 'skyblue',
            'opacity': '0.8',
            'font-family': 'verdana',
            'color': 'white',
        };
        const formStyle = {
            'border': '1px solid skyblue',
            'border-radius': '5px'
        };




        return (
            <AuthContext.Consumer>
                {
                    (context) => (
                        <div>
                            <Container>
                                <br />
                                <br />
                                <br />
                                <Row>
                                    <br />
                                    <Col className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" >
                                        <Container>
                                            <Jumbotron className="jumbo" style={styles}>

                                                <h6>Align education knowledge and skills needs for success;
                                                        {context.state.name}

                                                    <br />
                                                        Access Education that equips you for life success;
                                                        <br />
                                                    <br />
                                                        Access industry that needs knowledge and skills you have gained;
                                                        <br /><br />
                                                        Build efficient workforce that meet your business knowledge and skill needs;
                                                        <br /><br />
                                                        Management staff performance and lots more with
                                                    </h6>
                                                <h3>ESGROWN</h3>
                                            </Jumbotron>
                                        </Container>
                                    </Col>
                                    <Col className="col-xl-2 col-lg-2 col-md-1 col-sm-0 col-0"></Col>
                                    <Col className="col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12"  >
                                        <Container style={formStyle} >
                                            <br />
                                            <label style={{ 'fontWeight': 'bold' }}>Sign In Admin</label>
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

                                                <Button variant="primary" type="submit" >
                                                    Login
                                                </Button>
                                                <br />

                                                <br />
                                                <label>Forgot password? <Link to="/forgotPassword">Reset</Link></label>
                                                <br />

                                            </Form>
                                            <br />
                                        </Container>
                                    </Col>
                                </Row>

                                <br />
                                <br />
                            </Container>
                        </div>
                    )
                }
            </AuthContext.Consumer>
        );
    }
}