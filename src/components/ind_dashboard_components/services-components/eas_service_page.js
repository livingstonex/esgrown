import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import EASVideoCard from './cards/eascard';
import EASService from './service-cards/easservice';
import "./general_service_style.css";
import GenService from './service-cards/gen_service_card';



const EASServicePage = () => {

    const [pageEAS, setPageEAS] = useState(0);

    useEffect(() => {
        //get logged in user details
        const user = JSON.parse(sessionStorage.getItem('key'));

        if (user.sub_status_eas === 'active') {
            setPageEAS(1)
        } else {
            setPageEAS(2)
        }

        //make request to api to get sub status
        // axios.get(`http://localhost:5000/subscriptioneas/${userData.id}`)
        //     .then(res => {
        //         if (res.data[0] > 0) {
        //             res.data[0].sub_status == 'active' ? setPageEAS(1) : setPageEAS(2)
        //         }
        //     })
        //     .catch(err => console.log(err));

    }, []);

    return (
        // <div className="container">
        //     <div className="row">
        //         <div className="col col-lg-12 col-md-offset-3 col-sm-10">
        //             {(pageEAS === 1) ? <EASService /> : (pageEAS === 2) ? <EASVideoCard /> : ""}
        //             {/* <EASVideoCard /> */}
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
                                    {(pageEAS === 1) ? <EASService/> : (pageEAS === 2) ? <EASVideoCard /> : ""}
                                </div>
                              {/* {(pageEAS === 1) ? <EASService/> : (pageEAS === 2) ? <EASVideoCard /> : ""} */}
                            </div>
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 col" style={{padding:"0px"}}><div className="right_col"></div></div>
                </div>
            </div>
        </div>
    );
}

export default EASServicePage;
