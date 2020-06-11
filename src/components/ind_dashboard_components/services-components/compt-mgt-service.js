import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import ComptVideoCard from './videocards/compt-mgt';
import ComptService from './service-cards/compt-mgt';
import "./general_service_style.css";



const ComptServicePage = () => {

    const [pageMgt, setPageMgt] = useState(0);

    useEffect(() => {
        //get logged in user details
        const user = JSON.parse(sessionStorage.getItem('key'));

        if (user.sub_status_compt_mgt === 'active') {
            setPageMgt(1)
        } else {
            setPageMgt(2)
        }

    }, []);


    return (


        <div className="container-fluid" style={{ height: 'auto', }}>
            <div className="d-flex justify-content-center">
                <div className="row" style={{ width: '75%', height: '100%' }}>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 col" style={{ padding: "0px" }}><div className="left_col"></div></div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-12 center_col" style={{ background: '#f5f5f5', paddingLeft: "30px", paddingRight: "30px", paddingTop: "15px", }}>
                        <div className="scroll d-flex justify-content-center" style={{ height: '100%', width: '100%', }}>
                            {/* Inner Div */}
                            <div className="col">
                                {(pageMgt === 1) ? <ComptService /> : (pageMgt === 2) ? <ComptVideoCard /> : ""}
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 col" style={{ padding: "0px" }}><div className="right_col"></div></div>
                </div>
            </div>
        </div>
    );
}

export default ComptServicePage;
