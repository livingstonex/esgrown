import React, { useState, useEffect } from 'react';
import '../general_service_style.css';

export default function GenServiceCard({ data, goBack }) {

    return (
        <React.Fragment>
            <div className="gen_card mb-5 mt-3 pt-3" style={{ width: '95%', background: '#FFFFFF', boxShadow: '5px, 5px, 10px, 10px rgba(0, 0, 0, 0.15)' }}>
                <p onClick={goBack}>back</p>
                <div className="d-flex justify-content-center" style={{ height: '7%' }}>
                    <p className="pt-3" style={{ fontFamily: 'quicksand', fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>{data.title} {data.id}</p>
                </div>
                <div className="pr-3 pl-3" style={{ width: '100%', height: '50%', background: '' }}>
                    {/* <img height="40%" width="100%" src="https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F191120053137-03-milky-way-images-australia.jpg"/> */}
                    {data.media ? data.media.split('/')[0] === "data:image" ? <img height='40%' width='100%' src={data.media} /> : <video src={data.media} controls style={{ width: '100%', height: '40%' }}></video> : <div className="d-flex justify-content-center align-items-center"><div><i className="fa fa-spinner fa-spin" style={{ height: '40%', width: "35%" }}></i></div></div>}
                </div>

                <div className="d-flex justify-content-center mb-3 mt-1" style={{ width: '100%', height: '43%', background: '' }}>
                    <div className="body-text" style={{ background: '', width: '95%', }}>
                        <p className="mt-3 mb-3 ml-3 mr-3" style={{ fontFamily: 'quicksand', fontSize: '12px', textAlign: 'justify', color: '#000000', height: 'auto' }}>
                            {data.body}
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}



// <div className="gen_card mb-5 mt-3 pt-3" style={{width:'95%', background:'#FFFFFF'}}>
//     <div className="pr-3 pl-3"  style={{width:'100%', height:'50%', background:''}}>
//         {/* <img height="40%" width="100%" src="https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F191120053137-03-milky-way-images-australia.jpg"/> */}
//         { data.media ? data.media.split('/')[0] === "data:image" ? <img height='40%' width = '100%' src={data.media} /> : <video src={data.media} controls style={{ width: '100%', height:'40%' }}></video> : '' }
//     </div>
//     <div className="d-flex justify-content-center" style={{height:'7%'}}>
//         <p className="pt-3" style={{fontFamily:'quicksand', fontSize:'14px', fontWeight:'bold', textAlign:'center'}}>IMPORTANCE OF THE HISTORY OF WESSEX</p>
//     </div>
//     <div className="d-flex justify-content-center mb-3 mt-1" style={{width:'100%', height:'43%', background:''}}>
//         <div className="body-text" style={{ background:'#C4C4C4', width:'95%',}}>
//             <p className="mt-3 mb-3 ml-3 mr-3" style={{fontFamily:'quicksand', fontSize:'12px', textAlign:'justify', color:'#000000', height:'auto'}}>
//                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
//                 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
//                 when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
//                 It has survived not only five centuries, but also the leap into electronic typesetting, 
//                 remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
//                 sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
//                 Aldus PageMaker including versions of Lorem Ipsum.
//                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
//                 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
//                 when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
//                 It has survived not only five centuries, but also the leap into electronic typesetting, 
//                 remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
//                 sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
//                 Aldus PageMaker including versions of Lorem Ipsum.
//                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
//                 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
//                 when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
//                 It has survived not only five centuries, but also the leap into electronic typesetting, 
//                 remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
//                 sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
//             </p>
//         </div>
//     </div>
// </div>