import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Accordion, Button, Card } from 'react-bootstrap';




const Activity = () => {

    const [admins, setAdmin] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const [exActivity, setExActivity] = useState([]);


    useEffect(() => {

        axios.get(`http://localhost:5000/admin/country_admins`)
            .then(res => {
                if (res.data) {
                    setAdmin(res.data);
                    setSpinner(false)
                }
            })
            .catch(err => console.log(err));

    }, [])

    const getActivity = (e) => {
        const id = e.target.getAttribute('data-id');

        console.log(id)
        
        axios.get(`http://localhost:5000/excercise/activity/${id}`)
            .then(res => {
                if (res.data) {
                    setExActivity(res.data)
                }
            })
            .catch(err => console.log(err));
    }
 
    return (
        <>
            {
                spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> :
                    <div className="container">
                        <div className="row">

                            {admins.map(ad => {
                                return (
                                    <div className="col col-lg-4 col-sm-6" style={{padding:'5px'}}>

                                        <Accordion defaultActiveKey="0">
                                            <Card>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Button} data-id={ad._id}  onClick={getActivity} variant="link" eventKey={ad._id}>
                                                        {ad.name} {" "}{" "} <br /><small>{ad.country}</small>
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey={ad._id}>
                                                    <Card.Body>
                                                        <p>Exercises</p>
                                                        <ul>
                                                            {exActivity.map(ac => {
                                                                return (
                                                                    <>
                                                                        <li>{ac.title}</li>
                                                                    </>
                                                                );
                                                            })}
                                                        </ul>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
            }
        </>
    );
}
export default Activity;