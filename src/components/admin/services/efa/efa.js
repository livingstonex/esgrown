import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EFAlog from '../components/content_log';
import EFAnewContent from '../eas/newcontent';



const EAS = () => {


    const title = "EFA Service Content Log";
    const contentTitle = "Create New EFA Content"
    const [efalog, setEfalog] = useState([]);
    const [spinner, setSpinner] = useState(true);

    const newContentUrl = `http://ec2-18-188-101-36.us-east-2.compute.amazonaws.com:5000/servicecontentefa/add`;



    useEffect(() => {

        axios.get(`http://ec2-18-188-101-36.us-east-2.compute.amazonaws.com:5000/servicecontentefa/`)
            .then(res => {
                if (res.data.length > 0) {
                    setEfalog(res.data);
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
                    <EFAlog title={title} data={efalog} spinner={spinner} />
                    <EFAnewContent url={newContentUrl} title={contentTitle} />
                </div>
            </div>
        </>
    );
}
export default EAS;