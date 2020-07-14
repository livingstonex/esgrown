import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Spinner } from 'react-bootstrap';




const CreateContentHome = (props) => {

    const [user, setUser] = useState();
    const [privileges, setPrivileges] = useState()
    const [spinner, setSpinner] = useState(true)

    useEffect(() => {
        const admin = JSON.parse(sessionStorage.getItem("key"));
        setUser(admin)
        setSpinner(false)
        setPrivileges(admin.privilege)


    }, []);

    const subject = (e) => {
        const subject = e.target.getAttribute('data-privilege');
        props.getSubject(subject);

    }


    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-around">
                    {spinner ? <Spinner animation="grow" /> :
                        privileges.map((pri, index) => {
                            return (
                                <>
                                    <div className="col col-lg-4 col-sm-6 justify-content-center mt-5">
                                        <br />
                                        <Card className="" style={{ height: '200px', textAlign: 'center' }}>
                                            <CardActionArea >
                                                <CardContent>
                                                    <Typography onClick={subject} data-privilege={pri} gutterBottom variant="" component="h5" style={{ padding: '50px' }} >
                                                        {pri} Content
                                                </Typography>

                                                </CardContent>

                                            </CardActionArea>
                                        </Card>
                                    </div>
                                </>
                            );
                        })}
                </div>
            </div>
        </>
    );
}
export default CreateContentHome;