import React from 'react';
import { Spinner, Accordion, Button, Card } from 'react-bootstrap';




const Contentlog = (props) => {

    const { data, spinner } = props

    return (
        <>
            <Card style={{ padding: '5px', height: '800px', overflow: 'scroll', marginRight: '20px' }} className="col col-lg-5 col-sm-6">
                <h6 style={{ textAlign: 'center' }}>{props.title}</h6>
                {spinner ? <Spinner animation="grow" /> : data.length === 0 ? <div className="d-flex justify-content-center" style={{fontSize:'25px',fontFamily: 'quicksand',color:'grey'}}>No Content Yet</div> :
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
