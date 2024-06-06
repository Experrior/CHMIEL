import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
        <Modal show={true} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="custom-secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="custom-primary" onClick={onConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};