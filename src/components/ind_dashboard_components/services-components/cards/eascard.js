import React from 'react';
import { Card } from 'react-bootstrap';


const EASCard = () => {
    return (
        <div>
            <Card>
                <Card.Img style={{ height: 300 }} variant="top" src="" />

                <Card.Footer >
                    Educational Advisory Services
                    <br />
                    <small className="text-muted">Why You Should Subscribe</small>
                </Card.Footer>
            </Card>
        </div>
    );

}

export default EASCard;