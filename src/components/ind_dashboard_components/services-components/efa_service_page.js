import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import EFAVideoCard from './cards/efacard';
import EFAService from './service-cards/efaservice';



const EFAServicePage = () => {

    const [pageEFA, setPageEFA] = useState(0);

    useEffect(() => {
        //get logged in user details
        const user = JSON.parse(sessionStorage.getItem('key'));

        if (user.sub_status_efa === 'active') {
            setPageEFA(1)
        } else {
            setPageEFA(2)
        }

    });

    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-12 col-sm-10">
                    {(pageEFA === 1) ? <EFAService /> : (pageEFA === 2) ? <EFAVideoCard /> : ""}
                </div>
            </div>
        </div>
    );
}

export default EFAServicePage;
