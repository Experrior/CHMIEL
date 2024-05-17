import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import ReactDOM from 'react-dom';
export const StartSprintAlert = (props) => {
    const [show, setShow] = useState(false);
    const showAlert = () => {
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 3000);
    };

    useEffect(() => {
        return () => clearTimeout(showAlert);
    }, [show]);

    return (
        <>
            <Button variant={"custom-tertiary-v2"} onClick={showAlert}>Start Sprint</Button>
            {show && ReactDOM.createPortal(
                <Alert variant="danger" style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 1050 }}>
                    <Alert.Heading>Sprint Start Failed</Alert.Heading>
                    <p>{props.alertText}</p>
                </Alert>,
                document.getElementById('root')
            )}
        </>
    );
}
