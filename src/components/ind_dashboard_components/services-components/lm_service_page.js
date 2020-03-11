import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import LMVideoCard from './cards/lmcard';
import LMService from './service-cards/lmservice';



const LMServicePage = () => {

    const [pageLM, setpageLM] = useState(0);

    useEffect(() => {
        //get logged in user details
        const userData = JSON.parse(sessionStorage.getItem('key'));

        //make request to api to get sub status
        axios.get(`http://localhost:5000/subscriptionelm/${userData.id}`)
            .then(res => {
                res.data[0].sub_status ? setpageLM(1) : setpageLM(2)
            })
            .catch(err => console.log(err));

    });

    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-10 col-sm-10">
                    {(pageLM === 0) ? <Spinner as="span" animation="grow" role="status" aria-hidden="true" /> : (pageLM === 1) ? <LMService /> : (pageLM === 2) ? <LMVideoCard /> : ""}
                </div>
            </div>
        </div>
    );
}

export default LMServicePage;
