import React, {useState, useEffect} from 'react';

export default function ExcerciseRankings({page}){
    const [exId, setExId] = useState("");

    const onChangeExId = (e) => {
        setExId(e.target.value);
    }
    return(
        <React.Fragment >
            <div className="container">
                <div className="d-flex justify-content-center mt-4 mb-4">
                <h2 style={{marginTop:'70px', fontFamily:'quicksand'}}>Rankings Page</h2>
                </div>
                
                <div className="d-flex justify-content-center">
                    <select className="form-control text-small" onChange={onChangeExId} style={{width:'50%'}}>
                        <option value="null">Select the jobs to view Rankings</option>
                        <option>Job 1</option>
                        <option>Job 2</option>
                        <option>Job 3</option>
                    </select>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    {/* Render Ranks here */}
                    { rankCard()}
                </div>
            </div>
        </React.Fragment>
    );

    // Rank Card Function

    function rankCard(){
        return <div style={{height:'50px', width:'80%', background:'silver', }} className="d-flex justify-content-around align-items-center">
                    <div>John Okafor</div>
                    <div> 57% <div className="btn btn-info btn-sm ml-3">Induct</div></div>
               </div>
    }
}