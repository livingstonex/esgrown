import React, {useState} from 'react';
import './card.css';
import {Image} from 'react-bootstrap';

export default function Card({imageUrl}){
    return(
        <React.Fragment>
            <div className="card_bg">
                    <div className="" style={{justifyContent:'center', }}> 
                        <div className="row d-flex justify-content-center">
                            <Image src={imageUrl} roundedCircle height='150' width='150' />
                        </div>
                        {/* <br/> */}
                        <hr/>
                        <div>
                        <p className="text" style={{textAlign:'justify', fontFamily:'quicksand', color:'greyAccent', fontSize:'12px'}}>Search for the keywords to learn more about each warning.
                        To ignore, add // eslint-disable-next-line to the line before.</p>
                        <a href=""><span style={{color:'grey', fontSize:'13px', fontFamily:'verdana', }}>learn more</span></a>
                        </div>
                    </div>
            </div>
        </React.Fragment>
    );
}


// <div className="slider" style={{width:'100%'}}>
//     <div className="col-lg-3">
//         <div className="d-flex justify-content-center align-items-center" >
//             <i className="fa fa-chevron-left" style={{marginTop:'50%'}}></i>
//         </div>
//     </div>
//     <div className="col-lg-2"><Card imageUrl="https://smallbusiness.findlaw.com/incorporation-and-legal-structures/corporate-structure-directors-to-shareholders/_jcr_content/pg/articleHeading/imageInLine.coreimg.jpeg"/></div>
//     <div className="col-lg-2"><Card imageUrl="https://www.unhcr.org/thumb1/5a1e75d74.jpg"/></div>
//     <div className="col-lg-2"><Card imageUrl="https://unity.trustradius.com/wp-content/uploads/2018/09/tech-in-school.jpg"/></div>
//     <div className="col-lg-3">
//         <div className="d-flex justify-content-center align-items-center" >
//             <i className="fa fa-chevron-right" style={{marginTop:'50%'}}></i>
//         </div>
//     </div>
//     {/* <div className="col-lg-2"></div> */}
//     <div className="col-lg-3"><Card imageUrl="https://cpimg.tistatic.com/05032834/b/4/Corporate-Staff-Uniform.jpg"/></div>
//     <div className="col-lg-3"><Card imageUrl="https://flexxzone.fcmb.com/wp-content/uploads/2018/10/black-teacher-1.jpg"/></div>
//     <div className="col-lg-3"><Card imageUrl="https://ewscripps.brightspotcdn.com/dims4/default/babb53a/2147483647/strip/true/crop/5484x3085+0+270/resize/1280x720!/quality/90/?url=https%3A%2F%2Fewscripps.brightspotcdn.com%2F5d%2F63%2Fe54bdb4845d59e6ede58f299dbd7%2Fap-196108200880.jpg"/></div>
//     <div className="col-lg-2"></div>
// </div>