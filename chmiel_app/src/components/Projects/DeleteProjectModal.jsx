import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';
import { MenuItem } from 'react-pro-sidebar';


export const DeleteProjectModal = ({deleteProject}) => {
    const [modalShow, setModalShow] = useState(false);

    const onCancel = () => {
        setModalShow(false)
    }

    const onConfirm = () => {
        deleteProject()
        setModalShow(false)
    }

    return (
        <>
            {/* <Button variant={"custom-tertiary"} onClick={() => setModalShow(true)}>+ Create Project</Button> */}
            <MenuItem active={false}
                        onClick={() => setModalShow(true)}>
                        <div className="menuItemContent">
                            <div className={"icon"}>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                            </div>
                            <div className="text">Delete project</div>
                        </div>
                    </MenuItem>
            <Modal
                show={modalShow}
                onHide={() => {
                    setModalShow(false)
                }}
                backdrop={"static"}
                centered
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
            >
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your project will be removed and all the work will be lost.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    );
}