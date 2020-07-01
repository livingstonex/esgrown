import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RMlog from '../components/content_log';
import RMnewContent from './newcontent';



const RM = () => {


    const title = "RM Service Content Log";
    const contentTitle = "Create New RM Content"
    const [rmlog, setRmlog] = useState([]);
    const [spinner, setSpinner] = useState(true);

    const newContentUrl = `http://18.188.101.36/servicecontentrm/add`;



    useEffect(() => {

        axios.get(`http://18.188.101.36/servicecontentrm/`)
            .then(res => {
                if (res.data.length > 0) {
                    setRmlog(res.data);
                    setSpinner(false)
                } else {
                    setSpinner(false)
                }
            }).catch(err => alert('oops' + err))
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <RMlog title={title} data={rmlog} spinner={spinner} />
                    <RMnewContent url={newContentUrl} title={contentTitle} />
                </div>
            </div>
        </>
    );
}
export default RM;