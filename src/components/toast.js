import React, { useState } from 'react';
import { Toast, Row, Col, Button } from 'react-bootstrap';
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';



const ToastComponent = (props) => {

    const { body, open, close, vertical, horizontal, type } = props;

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={close}
            anchorOrigin={{ vertical, horizontal }}
        >
            <Alert onClose={close} severity={type}>
                {body}
            </Alert>
        </Snackbar>
    );

}
export default ToastComponent;