import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Accordion, Button, Card } from 'react-bootstrap';




const Activity = () => {

    const [user, setUser] = useState();
    const [admins, setAdmin] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const [exActivity, setExActivity] = useState([]);
    const [easActivity, setEasActivity] = useState([]);
    const [efaActivity, setEfaActivity] = useState([]);
    const [lmActivity, setLmActivity] = useState([]);
    const [rmActivity, setRmActivity] = useState([]);





    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("key"));
        setUser(user)

        axios.post(`http://localhost:5000/admin/admins/${user.country}`)
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

        //get exercises
        axios.get(`http://localhost:5000/excercise/activity/${id}`)
            .then(res => {
                if (res.data) {
                    setExActivity(res.data)
                }
            })
            .catch(err => console.log(err));
        //get EAS
        axios.get(`http://localhost:5000/servicecontenteas/activity/${id}`)
            .then(res => {
                if (res.data) {
                    setEasActivity(res.data)
                }
            }).catch(err => console.log(err));
        //get EFA
        axios.get(`http://localhost:5000/servicecontentefa/activity/${id}`)
            .then(res => {
                if (res.data) {
                    setEfaActivity(res.data)
                }
            }).catch(err => console.log(err));

        // get LM 
        axios.get(`http://localhost:5000/servicecontentlm/activity/${id}`)
            .then(res => {
                if (res.data) {
                    setLmActivity(res.data)
                }
            }).catch(err => console.log(err));

        // get RM 
        axios.get(`http://localhost:5000/servicecontentlm/activity/${id}`)
            .then(res => {
                if (res.data) {
                    setRmActivity(res.data)
                }
            }).catch(err => console.log(err));
    }

    return (
        <>
            {
                spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> :
                    <div className="container mt-5">
                        <div className="d-flex justify-content-center"><h5 style={{fontFamily:'quicksand', color:'grey'}}>Admins Activities</h5></div>
                        <div className="row">

                            {admins.map(ad => {

                                return (
                                    <div className="col col-lg-4 col-sm-6" style={{ padding: '5px' }}>

                                        <Accordion defaultActiveKey="0">
                                            <Card>
                                                <Card.Header style={{ textAlign: 'center' }} data-id={ad._id} onClick={getActivity}>
                                                    <Accordion.Toggle as={Button} data-id={ad._id} onClick={getActivity} variant="link" eventKey={ad._id}>
                                                        {ad.name} {" "}{" "} <br /><small>{ad.country}</small>
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey={ad._id}>
                                                    <Card.Body>
                                                        {exActivity.length > 0 ?
                                                            <>
                                                                <p><u>Exercises</u></p>
                                                                <ul>
                                                                    {exActivity.map(ac => {
                                                                        return (
                                                                            <>
                                                                                <li>{ac.title}</li>
                                                                            </>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </>
                                                            : ""
                                                        }
                                                        {easActivity.length > 0 ?
                                                            <>
                                                                <p><u>EAS</u></p>
                                                                <ul>
                                                                    {easActivity.map(ac => {
                                                                        return (
                                                                            <>
                                                                                <li>{ac.title}</li>
                                                                            </>
                                                                        );
                                                                    })}
                                                                </ul>

                                                            </>
                                                            : ""
                                                        }
                                                        {efaActivity.length > 0 ?
                                                            <>
                                                                <p><u>EFA</u></p>
                                                                <ul>
                                                                    {efaActivity.map(ac => {
                                                                        return (
                                                                            <>
                                                                                <li>{ac.title}</li>
                                                                            </>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </>
                                                            : ""}
                                                        {lmActivity.length > 0 ?
                                                            <>
                                                                <p><u>LM</u></p>
                                                                <ul>
                                                                    {lmActivity.map(ac => {
                                                                        return (
                                                                            <>
                                                                                <li>{ac.title}</li>
                                                                            </>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </>
                                                            : ""}
                                                        {rmActivity.length > 0 ?
                                                            <>
                                                                <p><u>RM</u></p>
                                                                <ul>
                                                                    {rmActivity.map(ac => {
                                                                        return (
                                                                            <>
                                                                                <li>{ac.title}</li>
                                                                            </>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </>
                                                            : ""}


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