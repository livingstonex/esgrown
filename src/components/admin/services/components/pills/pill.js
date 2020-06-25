import React from 'react';
import '../comp.scss';

export default function Pills({text, pop}) {
    return(
        <React.Fragment>
            <div className="pill ml-2 pl-2 mr-2">{text} <i style={{color:'red', cursor:'pointer'}} className="mt-2 mr-2 cursor" onClick={()=>pop(text)}>X</i></div>
        </React.Fragment>
    );
}