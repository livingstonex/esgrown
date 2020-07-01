import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardActionArea, CardMedia, Typography, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Spinner } from 'react-bootstrap';



const ContentLog = (props) => {

    const { subject } = props;



    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
        },
    });

    const classes = useStyles();

    const [spinner, setSpinner] = useState(true);
    const [contentLog, setContentLog] = useState([])



    useEffect(() => {

        const user = JSON.parse(sessionStorage.getItem('key'));
        const level = user.tutor_level.toLowerCase();


        axios.get(`http://ec2-18-188-101-36.us-east-2.compute.amazonaws.com:5000/${level}/${subject}/${user.id}`)
            .then(res => {
                if (res.data) {
                    setSpinner(false)
                    setContentLog(res.data);
                }
            })
            .catch(err => console.log(err));
    }, [subject]);

    return (
        <>
            {
                spinner ? <Spinner animation="grow" /> :
                    <div className="container">
                        <div className="row">
                            {
                                contentLog.map(data => {
                                    return (
                                        <>

                                            <Card className="col col-lg-4 col-sm-6 mr-3">
                                                <br />
                                                <CardActionArea>
                                                    {
                                                        data.media ? data.media.split('/')[0] === "data:image" ? <img src={data.media} style={{ width: '100%' }} /> : <video src={data.media} controls style={{ width: '100%' }}></video> : ''
                                                    }
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {data.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {data.content.substring(0, 200)}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>

                                        </>

                                    );
                                })
                            }
                        </div>
                    </div>
            }
        </>
    );
}
export default ContentLog;