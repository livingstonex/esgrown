import React, {useState} from 'react';

export default function ExcerciseRankings({page}){
    return(
        <React.Fragment style={{marginTop:'70px'}}>
            <h1 onClick={()=>page}>Rankings Page</h1>
        </React.Fragment>
    );
}