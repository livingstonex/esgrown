import React from 'react';
import '../comp.scss';

export default function Pills({text}) {
    return(
        <React.Fragment>
            <div className="pill ml-2 mr-2 mb-2">{text} <p style={{color:'red'}}>X</p></div>
        </React.Fragment>
    );
}