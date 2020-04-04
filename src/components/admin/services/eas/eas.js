import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EASlog from '../components/content_log';
import EASnewContent from '../components/new_content';



const EAS = () => {


    const title = "EAS Service Content Log";
    const [easlog, setEaslog] = useState([]);
    const [spinner, setSpinner] = useState(true);


    useEffect(() => {

        axios.get(`http://localhost:5000/servicecontenteas/`)
            .then(res => {
                if (res.data.length > 0) {
                    setEaslog(res.data);
                    setSpinner(false)

                }
            }).catch(err => alert('oops Your ' + err))
    },[])
    console.log(easlog)

    return (
        <>
            <div className="container">
                <div className="row">
                    <EASlog title={title} data={easlog} spinner={spinner} />
                    <EASnewContent />
                </div>
            </div>
        </>
    );
}
export default EAS;