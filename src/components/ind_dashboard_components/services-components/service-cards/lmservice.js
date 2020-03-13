import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';





const LMService = () => {

    const [spinner, setSpinner] = useState(true)
    const [data, setData] = useState("")


    //get data from api
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(res => {
                setData(res.data);
                console.log(res.data)
                setSpinner(false);
            })
            .catch(err => console.log(err))
    }, []);



    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-12 col-sm-6" style={{ width: '100%', height: 500, boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.15)', background: '#ffffff', padding: '20px', borderRadius: '10px', overflow: 'scroll' }}>
                    <div className="">
                        <div>
                            {spinner ? <Spinner animation="grow" /> : data.map((data) => {

                                return (
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-8 offset-md-2" >
                                                <div className="card" style={{ fontFamily: 'Roboto,sans-serif', boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.15)', marginBottom: '10px' }}>
                                                    <div className="card-content" style={{ padding: '10px' }}>
                                                        <img className="img-responsive" src="http://lorempixel.com/555/300/sports" alt="placeholder" style={{ width: '100%' }} />
                                                        <h6>{data.title}</h6>
                                                        <p>{data.body}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LMService;
