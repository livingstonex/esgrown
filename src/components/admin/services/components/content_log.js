import React from 'react';
import { Spinner, Accordion, Button, Card } from 'react-bootstrap';




const Contentlog = (props) => {

    const { data } = props

    return (
        <>
            <Card style={{ padding: '5px', height: '800px', overflow: 'scroll', marginRight: '20px' }} className="col col-lg-5 col-sm-6">
                <h6 style={{ textAlign: 'center' }}>{props.title}</h6>
                {props.spinner ? <Spinner animation="grow" /> :
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
                                                data.image ? data.image.split(';')[0].split(':')[1].split('/')[0] == "image" ? <img src={data.image} style={{ height: '100px' }} /> :<video src={data.image} controls style={{height:'100px'}}></video>: ''
                                            }
                                        </Card.Body>
                                        
                                    </Accordion.Collapse>
                                </Card>
                            )
                        })}
                    </Accordion>}
            </Card>
        </>
    );
}
export default Contentlog;
