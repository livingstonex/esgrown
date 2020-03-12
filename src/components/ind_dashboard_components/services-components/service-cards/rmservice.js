import React from 'react';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';





const LMService = () => {

    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-2 col-sm-3" style={{ width: '100%', height: 500, boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.15)', background: '#ffffff', padding: '20px', borderRadius: '10px', marginRight: '5px' }}>hello</div>
                <div className="col col-lg-9 col-sm-6" style={{ width: '100%', height: 500, boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.15)', background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
                    <div className="" style={{ textAlign: 'center' }}>
                        <h5>Recruitment Management </h5>
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

export default LMService;
