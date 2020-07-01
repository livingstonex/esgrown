import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import GenServiceCard from './gen_service_card';





const EASService = () => {

    const [spinner, setSpinner] = useState(true)
    const [data, setData] = useState([])
    const [chunk, setChunk] = useState();


    //get data from api
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));

        if (user.sub_status_compt_mgt === 'active') {

            axios.get(`http://172.31.25.52/competence/service/`)
                .then(res => {
                    if (user.tic !== null) {
                        const teacherData = res.data.filter(td => {
                            return td.user_class === 'teacher'
                        })

                        setData(teacherData);

                    } else {
                        setData(res.data);
                    }
                    setSpinner(false);
                })
                .catch(err => console.log(err))
        }


    }, []);

    return (
        // <div className="container">
        //     <div className="row">
        //         <div className="col col-lg-10 col-sm-6"
        //             style={{ width: '100%', height: '100%', boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.15)', background: '#ffffff', padding: '20px', borderRadius: '10px', overflow: 'scroll', overflowX: 'hidden' }}>
        //             <div className="">
        //                 <div>
        //                     {spinner ? <Spinner animation="grow" /> : data.map((data) => {

        //                         return (
        //                             <div className="container">
        //                                 <div className="row">
        //                                     <div className="col-md-12" style={{ width: '100%', height: '100%' }}>
        //                                         <div className="card" style={{ fontFamily: 'Roboto,sans-serif', boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.15)', marginBottom: '10px' }}>
        //                                             <div className="card-content" style={{ padding: '10px' }}>

        //                                                 {
        //                                                     data.media ? data.media.split('/')[0] === "data:image" ? <img src={data.media} style={{ width: '100%' }} /> : <video src={data.media} controls style={{ width: '100%' }}></video> : ''
        //                                                 }
        //                                                 <h6 style={{ marginTop: '10px' }}>Title: {data.title}</h6>
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
        <React.Fragment>
            {
                spinner ? <div className="d-flex justify-content-center"><i className="fa fa-spinner fa-spin"></i></div> : data.map((data) => {
                    return (
                        <GenServiceCard data={data} />
                    )
                })
            }
        </React.Fragment>
    );
}

export default EASService;
