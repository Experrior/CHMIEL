import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";

export const CreateProjectModal = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const [projectName, setProjectName] = useState("");


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
            props.addProject(projectName);
            setModalShow(false);
            setErrors({})
        }
    }

    return (
        <>
            <Button variant={"custom-tertiary"} onClick={() => setModalShow(true)}>+ Create Project</Button>
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
                        Create New Project
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id={"addProjectForm"} noValidate validated={validated} onSubmit={onFormSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className={"mb-3"} controlId={"formGroupProjectName"}>
                                    <Form.Label>Project Name</Form.Label>
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