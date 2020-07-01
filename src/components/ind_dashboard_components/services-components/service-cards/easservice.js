import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import GenServiceCard from './gen_service_card';





const EASService = () => {

    const [spinner, setSpinner] = useState(true)
    const [data, setData] = useState([])
    let [counter, setCounter] = useState(1)
    const [chunk, setChunk] = useState([]);

    const chunkify = (arr, size) => {
        let currentChunk
        if (counter == 1) {
            currentChunk = arr.slice(0, size);
            setSpinner(false);
            return currentChunk
        } else {
            currentChunk = arr.slice(counter, counter += size);
            setSpinner(false);
            return currentChunk

        }
    }

    const loadMore = () => {
        setCounter(counter + 1);
        setChunk(chunkify(data, 3));
    }
    //get data from api
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));

        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(res => {
                console.log(res.data)
                setData(res.data)
                setChunk(chunkify(res.data, 3));

            }).catch(err => console.log(err));

        // axios.get(`http://ec2-18-188-101-36.us-east-2.compute.amazonaws.com:5000/servicecontenteas/`)
        //     .then(res => {

        //         if (user.sub_status_eas === 'active') {
        //             // get user level of education
        //             //make a call to the intended study api and get all stored intended study
        //             // if user level of education == res.data.level of edu && intended study == res.data.intended study
        //             // setData(res.data.subjects)
        //when he clicks on any of the subjects, make an api call to get content for each subject
        //         }


        //         setSpinner(false);
        //     })
        //     .catch(err => console.log(err))
    }, [chunkify]);

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
                spinner ? <div className="d-flex justify-content-center"><i className="fa fa-spinner fa-spin"></i></div>
                    :
                    chunk.map((data) => {
                        return (
                            <GenServiceCard data={data} />
                        )
                    })
            }
            <div className="d-flex justify-content-center" style={{ cursor: 'pointer' }}>
                <span onClick={loadMore}> MORE...</span>
            </div>
        </React.Fragment>
    );
}

export default EASService;
