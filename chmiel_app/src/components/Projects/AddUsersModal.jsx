import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';
import { MenuItem } from 'react-pro-sidebar';
import {useCookies} from "react-cookie";


export const AddUsersModal = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [userId, setUserId] = useState({});
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setUserId("")
    }, [modalShow])

    const findFormErrors = () => {
        const newErrors = {}
        if (!userId || userId === '') newErrors.userId = 'User id is required!'
        return newErrors
    }

    const onConfirm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        props.addUsersToProject(userId);
        setModalShow(false);
    }

    return (
        <>
            {/* <Button variant={"custom-tertiary"} onClick={() => setModalShow(true)}>+ Create Project</Button> */}
            <MenuItem active={true}
                        onClick={() => setModalShow(true)}>
                        <div className="menuItemContent">
                            <div className={"icon"}>
                                <FontAwesomeIcon icon={faUserPlus}/>
                            </div>
                            <div className="text">Add users</div>
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
                <Modal.Title>Add users</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form id={"addUserForm"} onSubmit={onConfirm}>
                        <Row>
                            <Col>
                                <Form.Group className={"mb-3"} controlId={"formGroupUserId"}>
                                    <Form.Label>Enter user id:</Form.Label>
                                    <Form.Control required
                                                  type={"text"}
                                                  value={userId}
                                                  onChange={(e) => {
                                                      setUserId(e.target.value)
                                                  }}
                                    />
                                </Form.Group>

                            </Col>
                        </Row>
                    </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant={"custom-primary"} form={"addUserForm"} type={"submit"}>Confirm</Button>
            </Modal.Footer>
            </Modal>
        </>
    );
}