import React from 'react';
import { Modal } from 'react-bootstrap';
import PaystackButton from 'react-paystack';
import './paystack.css';



const PayStackButton = (props) => {

    const { show, onHide, close, callback, email, amount } = props

    return (
        <React.Fragment>
            <Modal
                show={show}
                onHide={onHide}
                aria-labelledby="example-custom-modal-styling-title"
                centered
            >
                <Modal.Body style={{ width: 'auto', background: '#21a5e7' }}>
                    <PaystackButton
                        text="Proceed To Payment"
                        class="pay-btn"
                        close={close}
                        embed={false}
                        callback={callback}
                        email={email}
                        amount={amount}
                        paystackkey='pk_test_7b545e0d7a1aaa0e39782e7d5aa7e9595a8082fc'
                        tag="button"
                    />
                </Modal.Body>


            </Modal>
        </React.Fragment>
    );

}

export default PayStackButton;