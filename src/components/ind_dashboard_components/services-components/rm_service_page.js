import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import RMVideoCard from './cards/rmcard';
import RMService from './service-cards/rmservice';



const RMServicePage = () => {

    const [pageRM, setpageRM] = useState(0);

    useEffect(() => {
        //get logged in user details
        const userData = JSON.parse(sessionStorage.getItem('key'));

        //make request to api to get sub status
        axios.get(`http://localhost:5000/subscriptionerm/${userData.id}`)
            .then(res => {
                res.data[0].sub_status ? setpageRM(1) : setpageRM(2)
            })
            .catch(err => console.log(err));

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
