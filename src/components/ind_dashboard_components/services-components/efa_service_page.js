import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import EFAVideoCard from './cards/efacard';
import EFAService from './service-cards/efaservice';



const EFAServicePage = () => {

    const [pageEFA, setPageEFA] = useState(0);

    useEffect(() => {
        //get logged in user details
        const userData = JSON.parse(sessionStorage.getItem('key'));

        //make request to api to get sub status
        axios.get(`http://localhost:5000/subscriptionefa/${userData.id}`)
            .then(res => {
                res.data[0].sub_status ? setPageEFA(1) : setPageEFA(2)
            })
            .catch(err => console.log(err));

    });

    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-12 col-sm-10">
                    {(pageEFA === 0) ? <Spinner as="span" animation="grow" role="status" aria-hidden="true" /> : (pageEFA === 1) ? <EFAService /> : (pageEFA === 2) ? <EFAVideoCard /> : ""}
                </div>
            </div>
        </div>
    );
}

export default EFAServicePage;
