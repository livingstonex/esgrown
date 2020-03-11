import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';




const EASService = () => {

    const [badge, setBadge] = useState(true);
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <Card style={{ width: '16rem', height: '18rem' }}>
                <Card.Body>
                    {badge ? <Badge variant="success" style={{ float: 'right' }}>New 9</Badge> : ""}
                    <Card.Title>Eduction Advisory Service</Card.Title>
                    <Card.Text >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.incididunt ut labore et dolore magna aliqua.
                    </Card.Text>
                    <Button
                        variant="primary"
                        size="sm"
                        className="btn btn-info btn-sm"
                    // style={{ background: '#97ba0d', borderRadius: 20, border: '#97ba0d' }}
                    >
                        More Info
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default EASService;
