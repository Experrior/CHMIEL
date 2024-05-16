import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import ReactDOM from 'react-dom';
export const DeleteAlert = () => {
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
            <Button variant={"custom-tertiary-v3"} onClick={showAlert}>Delete Sprint</Button>
            {show && ReactDOM.createPortal(
                <Alert variant="danger" style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 1050 }}>
                    <Alert.Heading>Sprint Deletion Failed</Alert.Heading>
                    <p>Please move tasks to another sprint or to backlog before deleting.</p>
                </Alert>,
                document.getElementById('root')
            )}
        </>
    );
}
