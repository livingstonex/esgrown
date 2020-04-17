import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { Card, CardContent, CardActionArea, Typography, CardActions } from '@material-ui/core';




const AllAdmins = () => {

    const [countryAdmins, setCountryAdmins] = useState([]);
    const [spinner, setSpinner] = useState(true)

    useEffect(() => {

        axios.get(`http://localhost:5000/admin/country_admins`)
            .then(res => {
                if (res.data) {
                    setCountryAdmins(res.data);
                    setSpinner(false)
                }
            })
            .catch(err => console.log(err));

    }, [])
    return (
        <>
            {
                spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> :
                    <div className="container">
                        <div className="row">

                    {   countryAdmins.map(ad => {
                        return (
                            <>
                                <div className="col col-lg-3 col-sm-6">
                                    <Card>
                                        <CardActionArea >
                                            <CardContent style={{ background: '#E1E1E1' }} >
                                                <Typography gutterBottom variant="" component="h5" style={{ textAlign: 'center' }}>
                                                    <span >{ad.name}</span>
                                                </Typography>

                                                <Typography gutterBottom variant="" component="h5" style={{ textAlign: 'center' }}>
                                                    <span style={{fontSize:'12px'}}>Country:<br/></span> <span style={{ fontWeight: 'Bold', fontSize: "16px" }}>{ad.country}</span>
                                                </Typography>
                                                <Typography gutterBottom variant="" component="h5" style={{ textAlign: 'center' }}>
                                                    <span style={{ fontSize: '12px' }}>Email: <br /></span> <span style={{ fontWeight: 'Bold', fontSize: "16px" }}>{ad.email}</span>
                                                </Typography>
                                                <Typography gutterBottom variant="" component="h5" style={{ textAlign: 'center' }}>
                                                    <span style={{ fontSize: '12px' }}>Username:<br /></span><span style={{ fontWeight: 'Bold', fontSize: "16px" }}> {ad.username}</span>
                                                </Typography><br />

                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    <span>Privileges: &nbsp;</span>
                                                    <ul>
                                                        {ad.privilege.map(pri => {
                                                            return (
                                                                <li style={{ fontWeight: 'Bold', fontSize: "16px" }}>{pri}</li>

                                                            );
                                                        })}
                                                    </ul>
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
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
export default AllAdmins