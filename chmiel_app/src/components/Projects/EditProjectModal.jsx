import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';
import { MenuItem } from 'react-pro-sidebar';


export const EditProjectModal = ({editProjectName}) => {
    const [modalShow, setModalShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const [projectName, setProjectName] = useState({});


    const [errors, setErrors] = useState({})


    useEffect(() => {
        setProjectName("")
    }, [modalShow])

    const findFormErrors = () => {
        const newErrors = {}
        if (!projectName || projectName === '') newErrors.projectName = 'Project name is required!'
        return newErrors
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            editProjectName(projectName);
            setModalShow(false);
            setErrors({})
        }
    }

    return (
        <>
            {/* <Button variant={"custom-tertiary"} onClick={() => setModalShow(true)}>+ Create Project</Button> */}
            <MenuItem
                        onClick={() => setModalShow(true)}>
                        <div className="menuItemContent">
                            <div className={"icon"}>
                                <FontAwesomeIcon icon={faEdit}/>
                            </div>
                            <div className="text">Edit Name</div>
                        </div>
                    </MenuItem>
            <Modal
                show={modalShow}
                onHide={() => {
                    setModalShow(false)
                    setErrors({})
                }}
                backdrop={"static"}
                centered
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit project name
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id={"addProjectForm"} noValidate validated={validated} onSubmit={onFormSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className={"mb-3"} controlId={"formGroupProjectName"}>
                                    <Form.Label>New name</Form.Label>
                                    <Form.Control required
                                                  type={"text"}
                                                  value={projectName}
                                                  onChange={(e) => {
                                                      setProjectName(e.target.value)
                                                      if (!!errors["projectName"]) setErrors({
                                                          ...errors,
                                                          ["projectName"]: null
                                                      })
                                                  }}
                                                  isInvalid={!!errors.projectName}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.projectName}
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"custom-primary"} form={"addProjectForm"} type={"submit"}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}