import React from 'react';
import Button from '@material-ui/core/Button';




const SubmitBtn = (props) => {

    const { submitAns } = props;
    return (
        <>
            <div className="container text-center" >
                <div style={{ marginTop: '5%' }}>
                    <h6>You have exceeded your alloted time. Please click on the button to submit your answers</h6>
                </div>
                <div style={{}}>
                    <Button
                        style={{ background: '#21a5e7', border: '#21a5e7' }}
                        variant="contained"
                        onClick={submitAns}
                        size="lg"
                    >
                        submit Answere
                        </Button>
                </div>
            </div>
        </>
    );

}

export default SubmitBtn;