import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import RMVideoCard from './videocards/rmcard';
import RMService from './service-cards/rmservice';



const RMServicePage = () => {

    const [pageRM, setpageRM] = useState(0);

    useEffect(() => {
        //get logged in user details
        const user = JSON.parse(sessionStorage.getItem('key'));

        if (user.sub_status_rm === 'active') {
            setpageRM(1)
        } else {
            setpageRM(2)
        }

    });

    return (
        // <div className="container">
        //     <div className="row">
        //         <div className="col col-lg-10 col-sm-10">
        //             {(pageRM === 0) ? <Spinner as="span" animation="grow" role="status" aria-hidden="true" /> : (pageRM === 1) ? <RMService /> : (pageRM === 2) ? <RMVideoCard /> : ""}
        //         </div>
        //     </div>
        // </div>

        <div className="container-fluid" style={{height:'auto',}}>
            <div className="d-flex justify-content-center">
                <div className="row" style={{width:'75%', height:'100%'}}>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 col" style={{padding:"0px"}}><div className="left_col"></div></div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-12 center_col" style={{background:'#f5f5f5', paddingLeft:"30px", paddingRight:"30px", paddingTop:"15px",}}>
                            <div className="scroll d-flex justify-content-center" style={{height:'100%', width:'100%',}}> 
                            {/*  border: '1px solid', borderRightColor:'#E8E6E6', borderLeftColor:'#E8E6E6' */}
                                {/* Inner Div */}
                                <div className="col">
                                     {(pageRM === 0) ? <Spinner as="span" animation="grow" role="status" aria-hidden="true" /> : (pageRM === 1) ? <RMService /> : (pageRM === 2) ? <RMVideoCard /> : ""}
                                </div>
                            </div>
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 col" style={{padding:"0px"}}><div className="right_col"></div></div>
                </div>
            </div>
        </div>
    );
}

export default RMServicePage;
