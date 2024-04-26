import {Button, Form, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";

export const CreateIssueModal = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [errors, setErrors] = useState({})


    useEffect(() => {
        setTaskName("")
        setTaskDescription("")
    }, [modalShow])

    const findFormErrors = () => {
        const newErrors = {}
        if (!taskName || taskName === '') newErrors.taskName = 'Task name is required!'
        return newErrors
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            props.addIssue(taskName, taskDescription);
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