import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EASlog from '../components/content_log';
import EASnewContent from './newcontent';



const EAS = () => {


    const title = "EAS Service Content Log";
    const contentTitle = "Create New EAS Content";
    const [easlog, setEaslog] = useState([]);
    const [spinner, setSpinner] = useState(true);

    const newContentUrl = `http://172.31.25.52/servicecontenteas/add`;


    useEffect(() => {

        axios.get(`http://172.31.25.52/servicecontenteas/`)
            .then(res => {
                if (res.data.length > 0) {
                    setEaslog(res.data);
                    setSpinner(false)

                } else {
                    setSpinner(false)
                }
            }).catch(err => alert('oops ' + err))
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <EASlog title={title} data={easlog} spinner={spinner} />
                    <EASnewContent url={newContentUrl} title={contentTitle} />
                </div>
            </div>
        </>
    );
}
export default EAS;