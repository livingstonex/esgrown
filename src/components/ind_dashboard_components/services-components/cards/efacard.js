import React from 'react';
import { Card } from 'react-bootstrap';


const EFACard = () => {
    return (
        <div>
            <Card>
                <Card.Img variant="top" style={{ height:300}} src=""/>

                <Card.Footer > 
                    Education Finances Advisory 
                    <br />
                    <small className="text-muted">Why You Should Subscribe</small>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default EFACard;