import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Card, CardContent, CardActions, Typography } from '@material-ui/core';
import { Spinner, Accordion, Button, Card } from 'react-bootstrap';




const EASlog = () => {

    const [easlog, setEaslog] = useState([]);
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/servicecontenteas/`)
            .then(res => {
                setEaslog(res.data);
                setSpinner(false)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    const viewLog = (e) => {
        const id = e.target.id;

        const view = easlog.filter(eas => {
            return eas._id == id;
        })

        console.log(view)
    }

    return (
        <>
            <div className="col col-lg-5 col-sm-6" style={{ height: '550px',overflow:'scroll' }}>
                <br />
                <Accordion defaultActiveKey="0">
                    {easlog.map(eas => {
                        return (
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={eas._id}>
                                        {eas.title}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={eas._id}>
                                    <Card.Body>{eas.content}</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })}
                </Accordion>
            </div>
        </>
    );
}
export default EASlog;
