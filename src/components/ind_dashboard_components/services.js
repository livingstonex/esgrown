import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import EASCard from './services-components/cards/eascard';
import EFACard from './services-components/cards/efacard';
import LMCard from './services-components/cards/lmcard';
import RMCard from './services-components/cards/rmcard';
import EASServicePage from './services-components/eas_service_page';
import EFAServicePage from './services-components/efa_service_page';
import LMServicePage from './services-components/lm_service_page';
import RMServicePage from './services-components/rm_service_page';
import axios from 'axios';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';




export default function Services() {


    
    const [pageRM, setPageRM] = useState(0);
    const [pageLM, setPageLM] = useState(0);
    const [pageEAS, setPageEAS] = useState(0);
    const [pageEFA, setPageEFA] = useState(0);


    useEffect(() => {

        //get logged in user details
        const userData = JSON.parse(sessionStorage.getItem('key'));

        //make request to api to get sub status
        //eas
        axios.get(`http://localhost:5000/subscriptioneas/${userData.id}`)
            .then(res => {
                res.data[0].sub_status ? setPageEAS(1) : setPageEAS(2)
            }).catch(err => console.log(err));

        //efa
        axios.get(`http://localhost:5000/subscriptionefa/${userData.id}`)
            .then(res => {
                res.data[0].sub_status ? setPageEFA(1) : setPageEFA(2); 
            })
            .catch(err => {
                return console.log(err);
            }); 

        //lm
        axios.get(`http://localhost:5000/subscriptionlm/${userData.id}`)
            .then(res => {
                res.data[0].sub_status ? setPageLM(1) : setPageLM(2);
            })
            .catch(err => console.log(err))

        //rm
        axios.get(`http://localhost:5000/subscriptionrm/${userData.id}`)
            .then(res => {
                res.data[0].sub_status ? setPageRM(1) : setPageRM(2);
            })
            .catch(err => console.log(err))
    },[]);

    return (
        <div className="container">
            <div className="row">
                {/* <div className="col col-lg-3 col-sm-6">
                    <br />
                    {(pageEAS === 0) ? <Spinner as="span" animation="grow" role="status" aria-hidden="true" /> : (pageEAS === 1) ? <EASService /> : (pageEAS === 2) ? <EASCard /> : ""}
                </div>
                <div className="col col-lg-3 col-sm-6" >
                    <br />
                    {(pageEFA === 0) ? <Spinner as="span" animation="grow" role="status" aria-hidden="true" /> : (pageEFA === 1) ? <EFAService /> : (pageEFA === 2) ? <EFACard /> : ""}
                </div>

                <div className="col col-lg-3 col-sm-6" >
                    <br />
                    {(pageLM === 0) ? <Spinner as="span" animation="grow" size="lg" role="status" aria-hidden="true" /> : (pageLM === 1) ? <LMService /> : (pageLM === 2) ? <LMCard /> : ""}
                </div>
                <div className="col col-lg-3 col-sm-6" >
                    <br />
                    {(pageRM === 0) ? <Spinner as="span" animation="grow" size="lg" role="status" aria-hidden="true" /> : (pageRM === 1) ? <RMService /> : (pageRM === 2) ? <RMCard /> : ""}
                </div> */}

            </div>
        </div>
    );
}