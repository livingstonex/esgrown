import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Spinner } from 'react-bootstrap';



const TutorHome = (props) => {

    const { showSubjectContent } = props;

    const [user, setUser] = useState();
    const [privileges, setPrivileges] = useState()
    const [spinner, setSpinner] = useState(true);
    const [students, setStudents] = useState('');

    useEffect(() => {
        const admin = JSON.parse(sessionStorage.getItem("key"));
        setUser(admin)
        setSpinner(false)
        setPrivileges(admin.privilege)


    }, []);

    const getIndex = (e) => {
        const subject = e.target.getAttribute('data-subject');

        showSubjectContent(subject);

    }

    const getStudents = (e) => {
        const sub = e.target.getAttribute('data-sub');

        const subject = sub.toLowerCase();

        //make an axios call to student collection and get sutudents subscribed to "subject"

    }

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-around">
                    {spinner ? <Spinner animation="grow" /> :
                        privileges.map((pri, index) => {
                            return (
                                <>
                                    <div className="col col-lg-5 col-sm-6 justify-content-center mt-5">
                                        <br />
                                        <Card className="" style={{ height: '200px', textAlign: 'center' }}>
                                            <CardActionArea >
                                                <CardContent>
                                                    <Typography onClick={getIndex} data-subject={pri} gutterBottom variant="" component="h5" style={{ padding: '40px' }} >
                                                        {pri} Content log
                                                </Typography>

                                                </CardContent>

                                            </CardActionArea>
                                            <CardActions>
                                                <span data-sub={pri} onClick={getStudents} style={{ cursor: 'pointer' }}>Number of Students: {students}</span>
                                            </CardActions>
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
export default TutorHome;