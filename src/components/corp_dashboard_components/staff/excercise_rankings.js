import React, {useState, useEffect} from 'react';

export default function ExcerciseRankings({page}){
    const [exId, setExId] = useState("");

    const onChangeExId = (e) => {
        setExId(e.target.value);
    }
    return(
        <React.Fragment >
            <div className="container">
                <h1 style={{marginTop:'70px'}} >Rankings Page</h1>
                <div className="btn btn-primary">click me</div>
                <div className="d-flex justify-content-center">
                    <select className="form-control text-small" onChange={onChangeExId} style={{width:'50%'}}>
                        <option value="null">Select the excercises to view Rankings</option>
                        <option>Excercise 1</option>
                        <option>Excercise 2</option>
                        <option>Excercise 2</option>
                    </select>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <div style={{height:'50px', width:'80%', background:'grey'}}></div>
                </div>
            </div>
        </React.Fragment>
    );
}