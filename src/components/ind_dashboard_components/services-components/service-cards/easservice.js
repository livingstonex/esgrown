import React, { useEffect, useState } from 'react';
import { Pagination, Spinner } from 'react-bootstrap';
import axios from 'axios';





const EASService = () => {

    const [data, setData] = useState("")
    const [spinner, setSpinner] = useState(false)

    //get data from api
    useEffect(() => {
        setSpinner(true);
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(res => {
                setData(res.data)
                setSpinner(false)
            })
            .catch(err => console.log(err))
    }, []);

    console.log(data);


    let active = 1;
    let items = [];
    for (let number = 1; number <= data.length; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : number}
            </Pagination.Item>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-2 col-sm-3" style={{ width: '100%', height: 500, boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.15)', background: '#ffffff', padding: '20px', borderRadius: '10px', marginRight: '5px' }}>hello</div>
                <div className="col col-lg-9 col-sm-6" style={{ width: '100%', height: 500, boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.15)', background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
                    <div className="" style={{ textAlign: 'center' }}>
                        <h5>Education Advisory Service </h5>
                        <div style={{ height: 400, background: '#ddf7fc' }}>
                            <p>content</p>
                        </div>
                        <div style={{ height: '5px' }}></div>
                        <div style={{ marginLeft: '40%' }}>
                            <Pagination>{items}</Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EASService;
