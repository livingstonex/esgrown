import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import RMVideoCard from './cards/rmcard';
import RMService from './service-cards/rmservice';



const RMServicePage = () => {

    const [pageRM, setpageRM] = useState(0);

    useEffect(() => {
        //get logged in user details
        const user = JSON.parse(sessionStorage.getItem('key'));

        if (user.sub_status_lm === 'active') {
            setpageRM(1)
        } else {
            setpageRM(2)
        }

    });

    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-10 col-sm-10">
                    {(pageRM === 0) ? <Spinner as="span" animation="grow" role="status" aria-hidden="true" /> : (pageRM === 1) ? <RMService /> : (pageRM === 2) ? <RMVideoCard /> : ""}
                </div>
            </div>
        </div>
    );
}

export default RMServicePage;
