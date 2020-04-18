import React from 'react';

const StartBtn = (props) => {
    const { setStart } = props;
    return (
        <>
            <div className="container">
                <div className="text-center" style={{ marginTop: '5%' }}>
                    <h5>You have 50 seconds to answere all question. Click start when you are ready</h5>
                </div>
                <div className="text-center">
                    <button className="btn btn-lg btn-primary" onClick={setStart}>Start Exercise</button>
                </div>
            </div>
        </>
    );
}

export default StartBtn;