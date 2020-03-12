import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import EASVideoCard from './cards/eascard';
import EASService from './service-cards/easservice';



const EASServicePage = () => {

    const [pageEAS, setPageEAS] = useState(0);

    useEffect(() => {
        //get logged in user details
        const userData = JSON.parse(sessionStorage.getItem('key'));

        //make request to api to get sub status
        axios.get(`http://localhost:5000/subscriptioneas/${userData.id}`)
            .then(res => {
                res.data[0].sub_status ? setPageEAS(1) : setPageEAS(2)
            })
            .catch(err => console.log(err));

    });

    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-12 col-sm-10">
                    {(pageEAS === 0) ? <Spinner as="span" animation="grow" role="status" aria-hidden="true" /> : (pageEAS === 1) ? <EASService /> : (pageEAS === 2) ? <EASVideoCard /> : ""}
                </div>
            </div>
        </div>
    );
}

export default EASServicePage;
