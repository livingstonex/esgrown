import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";

import { Container, Col, Row, Form, Button, Jumbotron, Spinner } from "react-bootstrap";





const AdminLogin = () => {

    const [spinner, setSpinner] = useState(false)
    const [data, setData] = useState('email', 'password');

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({
            ...data,
            [name]: value
        })

    }


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
                                        <label style={{ 'fontWeight': 'bold' }}>Admin Sign In </label>
                                        <Form >
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Username:</Form.Label>
                                                <Form.Control type="email" name="username" required placeholder="Enter Username" onChange={handleChange} value={data.email} />
                                                <Form.Text className="text-muted">
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password:</Form.Label>
                                                <Form.Control type="password" name="password" required placeholder="Password" onChange={handleChange} value={data.password} />
                                            </Form.Group>

                                            <Button variant="primary" onClick={() => {
                                                setSpinner(true)

                                                const username = data.username;
                                                const password = data.password;


                                                const loginData = {
                                                    username: username,
                                                    password: password
                                                }


                                                //check login details
                                                axios.post(`http://13.59.192.18/api/admin/login`, loginData)
                                                    .then(res => {
                                                        if (res.data !== 'failed') {
                                                            context.setUserAuthData(true);
                                                            console.log(res.data)
                                                            const user = {
                                                                name: res.data.name,
                                                                privilege: res.data.privilege,
                                                                email: res.data.email,
                                                                tutor_level: res.data.tutor_level,
                                                                role: res.data.role,
                                                                country: res.data.country,
                                                                id: res.data._id,
                                                                isLogged: true,
                                                                status: "ADMIN"
                                                            }
                                                            sessionStorage.setItem("key", JSON.stringify(user));

                                                            setSpinner(false)
                                                            window.location = "/frontier";

                                                        } else {
                                                            setSpinner(false)
                                                            alert(" Wrong login details, please try again");


                                                        }


                                                    })
                                                    .catch(err => console.log(err))
                                            }
                                            }>
                                                {spinner ? <Spinner animation="grow" /> : 'Sign In'}
                                            </Button>
                                            <br />
                                            <br />
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

export default AdminLogin;