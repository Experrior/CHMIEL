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
            props.addIssue(projectName, projectDescription, timeEstimate, assignee);
            setModalShow(false);
            setErrors({})
        }
    }

    return (
        <>
            <Button variant={"custom-tertiary"} onClick={() => setModalShow(true)}>+ Create Issue</Button>
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
                        Create New Issue
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id={"addIssueForm"} noValidate validated={validated} onSubmit={onFormSubmit}>
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
                            <Col>
                                <Form.Group className={"mb-3"} controlId={"formGroupStatus"}>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        value={status}
                                        onChange={(e) => {
                                            setStatus(e.target.value)
                                            if (!!errors["status"]) setErrors({
                                                ...errors,
                                                ["status"]: null
                                            })
                                        }} isInvalid={!!errors.status}>
                                        <option value={"backlog"}>backlog</option>
                                        <option value={"to-do"}>to-do</option>
                                        <option value={"in progress"}>in progress</option>
                                        <option value={"review"}>review</option>
                                        <option value={"done"}>done</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.status}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className={"mb-3"} controlId={"formGroupTimeEstimate"}>
                                    <Form.Label>Time Estimate</Form.Label>
                                    <Form.Control required
                                                  type={"number"}
                                                  step={0.1}
                                                  value={timeEstimate}
                                                  min={0.1}
                                                  onChange={(e) => {
                                                      setTimeEstimate(e.target.value)
                                                      if (!!errors["timeEstimate"]) setErrors({
                                                          ...errors,
                                                          ["timeEstimate"]: null
                                                      })
                                                  }}
                                                  isInvalid={!!errors.timeEstimate}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.timeEstimate}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className={"mb-3"} controlId={"formGroupAssignee"}>
                                    <Form.Label>Assignee</Form.Label>
                                    <Form.Select
                                        value={assignee}
                                        onChange={(e) => {
                                            setAssignee(e.target.value)
                                            if (!!errors["assignee"]) setErrors({
                                                ...errors,
                                                ["assignee"]: null
                                            })
                                        }} isInvalid={!!errors.assignee}>
                                        <option>No assignee</option>
                                        {props.user?.map((user) => (
                                            <option value={user.id}>{user.firstName} {user.lastName}</option>
                                        ))}

                                    </Form.Select>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.assignee}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className={"mb-3"} controlId={"formGroupProjectDescription"}>
                            <Form.Label>Project Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                type={"text"}
                                rows={3}
                                value={projectDescription}
                                onChange={(e) => {
                                    setProjectDescription(e.target.value)
                                    if (!!errors["projectDescription"]) setErrors({
                                        ...errors,
                                        ["projectDescription"]: null
                                    })
                                }}
                                isInvalid={!!errors.projectDescription}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.projectDescription}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"custom-primary"} form={"addIssueForm"} type={"submit"}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}