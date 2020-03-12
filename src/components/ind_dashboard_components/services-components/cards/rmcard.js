import React from 'react';
import { Card } from 'react-bootstrap';


const RMCard = () => {
    return (
        <div>
            <Card>
                <Card.Img variant="top" style={{ height:300}} src="" />

                <Card.Footer >
                    Recruitment Management
                    <br />
                    <small className="text-muted">Why You Should Subscribe</small>
                </Card.Footer>
            </Card>
        </div>
    );

}

export default RMCard;