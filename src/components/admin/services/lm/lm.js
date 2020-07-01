import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LMlog from '../components/content_log';
import LMnewContent from './newcontent';



const LM = () => {


    const title = "LM Service Content Log";
    const contentTitle = "Create New LM Content"
    const [lmlog, setLmlog] = useState([]);
    const [spinner, setSpinner] = useState(true);

    const newContentUrl = `http://18.188.101.36/servicecontentlm/add`;



    useEffect(() => {

        axios.get(`http://18.188.101.36/servicecontentlm/`)
            .then(res => {
                if (res.data.length > 0) {
                    setLmlog(res.data);
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
                    <LMlog title={title} data={lmlog} spinner={spinner} />
                    <LMnewContent url={newContentUrl} title={contentTitle} />
                </div>
            </div>
        </>
    );
}
export default LM;