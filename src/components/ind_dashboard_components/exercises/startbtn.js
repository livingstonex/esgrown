import React from 'react';


const StartBtn = (props) => {
    const { setStart, duration } = props;
    return (
        <>
            <div className="container">
                <div className="text-center" style={{ marginTop: '5%' }}>
                    <h5 className="text-center">You have {duration} minutes to answer all question. Click start when you are ready</h5>
                </div>
                <div className="text-center">
                    <button className="btn btn-lg btn-primary" onClick={setStart}>Start Exercise</button>
                </div>
            </div>
        </>
    );
}

export default StartBtn;