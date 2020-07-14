import React from 'react';


const StartBtn = (props) => {
    const { setStart, duration, disabled, exTaken } = props;
    const btnColor = exTaken ? 'red' : "";
    return (
        <>
            <div className="container">
                <div className="text-center" style={{ marginTop: '5%' }}>
                    <h5 className="text-center">You have {duration} minutes to answer all question. Click start when you are ready</h5>
                </div>
                <div className="text-center">
                    <button className="btn btn-lg btn-primary" disabled={disabled || exTaken} onClick={setStart} style={{ background: btnColor}}>Start Exercise</button>
                    {exTaken ? <p className="mt-3" style={{color:'red'}}>You have Taken this exercise before</p> : "" }
                </div>
            </div>
        </>
    );
}

export default StartBtn;