import React, { useState, useEffect } from 'react';
import NewServiceContent from './components/new_content';
import ContentLog from './components/content_log';
import axios from 'axios';
import { setDefaultLocale } from 'react-datepicker';


export default function RMContentCreation() {

    

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        setUser(user)

    }, []);

    const [data, setData] = useState([]);
    const [spinner, setSpinner] = useState();
    const [user, setUser] = useState();
    // console.log(data)

    return (
        <React.Fragment >
            <div className="container" style={{ marginTop: '70px' }}>
                <div className="d-flex justify-content-around mb-5 mt-3">
                    <ContentLog data={data} spinner={spinner} />
                    <NewServiceContent reloadContentLog={getCorpContent()} />
                </div>
            </div>
        </React.Fragment>
    );


    function getCorpContent(id) {
        try {
            axios.get(`http://172.31.25.52:5000/corpservicecontent/corp/${id}`)
                .then(res => {
                    setData(res.data);
                    setSpinner(false)
                 })
                .catch(err => {
                    console.log(err);
                });
        } catch (error) {

        }
    }
}