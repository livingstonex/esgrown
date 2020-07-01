import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { Card, CardContent, CardActionArea, Typography, CardActions } from '@material-ui/core';




const Home = () => {

    const [user, setUser] = useState();
    const [admins, setAdmins] = useState([]);
    const [spinner, setSpinner] = useState(false);


    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("key"));
        setUser(user)

        setSpinner(true)
        axios.post(`http://ec2-18-188-101-36.us-east-2.compute.amazonaws.com:5000/admin/admins/${user.country}`)
            .then(res => {
                if (res.data) {
                    setAdmins(res.data);
                    setSpinner(false)

                }
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            {
                spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    :
                    <div className="container mt-5">
                        <div className="d-flex justify-content-center"><h5 style={{ fontFamily: 'quicksand', color: 'grey' }}>All Admins</h5></div>
                        <div className="row">
                            {admins.map(ad => {
                                return (

                                    <>
                                        <div className="col col-lg-4 col-sm-6">
                                            <Card style={{ height: '300px', background: '#F7F7F7' }}>
                                                <CardContent >
                                                    <Typography gutterBottom variant="" component="h5" style={{ textAlign: 'center' }}>
                                                        <span>{ad.name}</span>
                                                    </Typography><br />
                                                    <div style={{ paddingLeft: '20px', fontSize: '16px' }}>
                                                        <div className="row" >
                                                            <div>Country:</div>

                                                            <div style={{ paddingLeft: '20px' }}>{ad.country}</div>
                                                        </div><br />

                                                        <div className="row" >
                                                            <div>Email:</div>

                                                            <div style={{ paddingLeft: '20px' }}>{ad.email}</div>
                                                        </div><br />

                                                        <div className="row" >
                                                            <div>Username:</div>

                                                            <div style={{ paddingLeft: '20px' }}>{ad.username}</div>
                                                        </div><br />

                                                        <div className="row" >
                                                            <div>Privileges:

                                                                <ul>
                                                                    {ad.privilege.map(pri => {
                                                                        return (
                                                                            <li>{pri}</li>

                                                                        );
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <br />
                                        </div>
                                    </>

                                );
                            })}
                        </div>
                    </div>
            }
        </>
    );
}
export default Home;