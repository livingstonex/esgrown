import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import LMVideoCard from './cards/lmcard';
import LMService from './service-cards/lmservice';



const LMServicePage = () => {

    const [pageLM, setpageLM] = useState(0);

    useEffect(() => {
        //get logged in user details
        const user = JSON.parse(sessionStorage.getItem('key'));

        if (user.sub_status_lm === 'active') {
            setpageLM(1)
        } else {
            setpageLM(2)
        }

    });

    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-10 col-sm-10">
                    {(pageLM === 1) ? <LMService /> : (pageLM === 2) ? <LMVideoCard /> : ""}
                </div>
            </div>
        </div>
    );
}

export default LMServicePage;
