import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import GenServiceCard from './gen_service_card';





const EFASService = () => {

    const [spinner, setSpinner] = useState(true)
    const [data, setData] = useState([])


    //get data from api
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));

        axios.get(`http://localhost:5000/servicecontentefa/`)
            .then(res => {
                if (user.status === "individual" && user.org_type === "school" && user.sub_status_efa === "active") {

                    const teacherData = res.data.filter(d => {
                        return d.user_class === 'teacher'
                    })
                    setData(teacherData);

                } else if (user.status === 'individual' && user.org_type === "company" && user.sub_status === "active") {

                    const staffData = res.data.filter(d => {
                        return d.user_class === 'company-staff'
                    })
                    setData(staffData);

                } else if (user.status === 'individual' && user.org_type === null) {

                    const indiv = res.data.filter(d => {
                        return d.user_class === 'individual'
                    })
                    setData(indiv);
                }
                setSpinner(false);
            })
            .catch(err => console.log(err))
    }, []);



    return (
        // <div className="container">
        //     <div className="row">
        //         <div className="col col-lg-12 col-sm-6" style={{ width: '100%', height: 500, boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.15)', background: '#ffffff', padding: '20px', borderRadius: '10px', overflow: 'scroll' }}>
        //             <div className="">
        //                 <div>
        //                     {spinner ? <Spinner animation="grow" /> : data.map((data) => {

        //                         return (
        //                             <div className="container">
        //                                 <div className="row">
        //                                     <div className="col-md-12" style={{width:'100%'}}>
        //                                         <div className="card" style={{ fontFamily: 'Roboto,sans-serif', boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.15)', marginBottom: '10px' }}>
        //                                             <div className="card-content" style={{ padding: '10px' }}>
        //                                                 {/* <img className="img-responsive"
        //                                                     src="http://lorempixel.com/555/300/sports"
        //                                                     alt="placeholder"
        //                                                     style={{ width: '100%' }} /> */}
        //                                                 {
        //                                                     data.media ? data.media.split('/')[0] === "data:image" ? <img src={data.media} style={{ width: '100%' }} /> : <video src={data.media} controls style={{ width: '100%' }}></video> : ''
        //                                                 }
        //                                                 <h6>{data.title}</h6>
        //                                                 <p>{data.body}</p>
        //                                             </div>
        //                                         </div>

        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         )
        //                     })}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <React.fragment>
            {
                spinner ? <div className="d-flex justify-content-center"><i className="fa fa-spinner fa-spin"></i></div> : data.map((data) => {
                    return (
                        <GenServiceCard data={data} />
                    )
                })
            }
        </React.fragment>
    );
}

export default EFASService;
