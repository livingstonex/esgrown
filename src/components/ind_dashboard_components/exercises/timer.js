import React, { useState, useEffect } from 'react';
import Timer from 'react-compound-timer';
import SubmitBtn from './submitbtn';


const TimerComponent = ({ duration, setPage }) => {


    return (
        <>
            <Timer
                initialTime={60000 * duration}
                startImmediately={true}
                direction="backward"
                checkpoints={[
                    {
                        time: 0,
                        callback: () => setPage(),
                    },
                ]}
            >
                <React.Fragment>
                    <div className="d-flex justify-content-center">
                        <Timer.Minutes /> min :
                        <Timer.Seconds /> sec
                    </div>
                </React.Fragment>
            </Timer>
        </>
    );
}

export default TimerComponent;

