import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";

export const CreateIssueModal = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const [timeEstimate, setTimeEstimate] = useState(null);
    const [assignee, setAssignee] = useState(0);
    const [status, setStatus] = useState("backlog");

    const statuses = ["backlog", "todo", "in progress", "review", "done"]

    const [errors, setErrors] = useState({})


    useEffect(() => {
        setTaskName("")
        setTaskDescription("")
        setTimeEstimate(null)
        setAssignee(null)
        setStatus("backlog")
    }, [modalShow])

    const findFormErrors = () => {
        const newErrors = {}
        if (!taskName || taskName === '') newErrors.taskName = 'Task name is required!'
        if (!timeEstimate || timeEstimate === '') newErrors.timeEstimate = 'Time estimate is required!'

        return newErrors
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            props.addIssue(taskName, taskDescription, timeEstimate, assignee);
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
                                <Form.Group className={"mb-3"} controlId={"formGroupTaskName"}>
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control required
                                                  type={"text"}
                                                  value={taskName}
                                                  onChange={(e) => {
                                                      setTaskName(e.target.value)
                                                      if (!!errors["taskName"]) setErrors({
                                                          ...errors,
                                                          ["taskName"]: null
                                                      })
                                                  }}
                                                  isInvalid={!!errors.taskName}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.taskName}
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
                        <Form.Group className={"mb-3"} controlId={"formGroupTaskDescription"}>
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                type={"text"}
                                rows={3}
                                value={taskDescription}
                                onChange={(e) => {
                                    setTaskDescription(e.target.value)
                                    if (!!errors["taskDescription"]) setErrors({
                                        ...errors,
                                        ["taskDescription"]: null
                                    })
                                }}
                                isInvalid={!!errors.taskDescription}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.taskDescription}
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