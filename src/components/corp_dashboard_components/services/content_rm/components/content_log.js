import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Accordion, Button, Card } from 'react-bootstrap';




const Contentlog = () => {

    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        setUser(user)

        axios.get(`http://172.31.25.5:5000/corpservicecontent/corp/${user.id}`)
            .then(res => {
                console.log(res.data)
                setData(res.data);
                setSpinner(false)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Card style={{ padding: '5px', height: '800px', overflow: 'scroll', marginRight: '20px' }} className="col col-lg-5 col-sm-6">
                {/* <h6 style={{ textAlign: 'center' }}>{title}</h6> */}
                {spinner ? <Spinner animation="grow" /> : data.length === 0 ? <div className="d-flex justify-content-center" style={{ fontSize: '25px', fontFamily: 'quicksand', color: 'grey' }}>No Content Yet</div> :
                    <Accordion defaultActiveKey="0">
                        {data.map(data => {
                            return (
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey={data._id}>
                                            {data.title}<br /><small style={{ fontSize: '13px' }}>Published: {data.is_published ? "true" : "false"}</small>
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={data._id}>
                                        <Card.Body>
                                            {data.content}
                                            {
                                                data.media ? data.media.split(';')[0].split(':')[1].split('/')[0] == "image" ? <img src={data.media} style={{ height: '100px' }} /> : <video src={data.media} controls style={{ height: '100px' }}></video> : ''
                                            }
                                        </Card.Body>

                                    </Accordion.Collapse>
                                </Card>
                            )
                        })}
                    </Accordion>

                }
            </Card>
        </>
    );
}
export default Contentlog;
