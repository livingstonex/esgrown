import React, { useState, useEffect } from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import EASCard from './services-components/cards/eascard';
import EFACard from './services-components/cards/efacard';
import LMCard from './services-components/cards/lmcard';
import RMCard from './services-components/cards/rmcard';
import axios from 'axios';




export default function Services() {

    const [EAS, setEAS] = useState(false);
    const [EFA, setEFA] = useState(false);
    const [RM, setRM] = useState(false);
    const [LM, setLM] = useState(false);


    useEffect(() => {

        //get logged in user details
        const userData = JSON.parse(sessionStorage.getItem('key'));

        //make request to api to get sub status
        //eas
        axios.get(`http://localhost:5000/subscriptioneas/${userData.id}`)
            .then(res => {
                if (res.data[0].sub_status == true) {
                    setEAS(true)
                }
            }).catch(err => console.log(err));

        //efa
        axios.get(`http://localhost:5000/subscriptionefa/${userData.id}`)
            .then(res => {
                if (res.data[0].sub_status == true) {
                    setEFA(true);
                }
            })
            .catch(err => console.log(err))

        //lm
        axios.get(`http://localhost:5000/subscriptionlm/${userData.id}`)
            .then(res => {
                if (res.data[0].sub_status == true) {
                    setLM(true);
                }
            }).catch(err => console.log(err))

        //rm
        axios.get(`http://localhost:5000/subscriptionrm/${userData.id}`)
            .then(res => {
                if (res.data[0].sub_status == true) {
                    setLM(true);
                }
            }).catch(err => console.log(err))
    })
    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-3 col-sm-6">
                    <br />
                    {EAS ? "EASserviceComponent" : <EASCard />}
                </div>
                <div className="col col-lg-3 col-sm-6" >
                    <br />
                    {EFA ? 'EFAserviceComponent' : <EFACard />}
                </div>

                <div className="col col-lg-3 col-sm-6" >
                    <br />
                    {LM ? "LMserviceComponent" : <LMCard />}
                </div>
                <div className="col col-lg-3 col-sm-6" >
                    <br />
                    {RM ? "RMserviceComponent" : <RMCard />}
                </div>

            </div>
        </div>
    );
}