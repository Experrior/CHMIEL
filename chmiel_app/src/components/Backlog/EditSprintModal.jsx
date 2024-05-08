import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";

export const EditSprintModal = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const [sprintName, setSprintName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    // const [taskDescription, setTaskDescription] = useState("");
    const [errors, setErrors] = useState({})


    useEffect(() => {
        setSprintName(props.sprint.sprintName)
        setStartTime(props.sprint.startTime)
        setEndTime(props.sprint.endTime)

        // setTaskDescription("")
    }, [modalShow])

    const findFormErrors = () => {
        const newErrors = {}
        if (!sprintName || sprintName === '') newErrors.sprintName = 'Sprint name is required!'
        return newErrors
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            // props.addIssue(sprintName, taskDescription);
            setModalShow(false);
            setErrors({})
        }
    }

    return (
        <>
            <Button variant={"custom-tertiary"} onClick={() => setModalShow(true)}>Edit Sprint</Button>
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
                        Edit Sprint
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id={"editSprintForm"} noValidate validated={validated} onSubmit={onFormSubmit}>
                        <Form.Group className={"mb-3"} controlId={"formGroupSprintName"}>
                            <Form.Label>Sprint Name</Form.Label>
                            <Form.Control required
                                          type={"text"}
                                          value={sprintName}
                                          onChange={(e) => {
                                              setSprintName(e.target.value)
                                              if (!!errors["sprintName"]) setErrors({
                                                  ...errors,
                                                  ["sprintName"]: null
                                              })
                                          }}
                                          isInvalid={!!errors.sprintName}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.sprintName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className={"mb-3"} controlId={"formGroupStartTime"}>
                                    <Form.Label>Start Time</Form.Label>
                                    <Form.Control
                                        type={"datetime-local"}
                                        value={startTime}
                                        onChange={(e) => {
                                            setStartTime(e.target.value)
                                            if (!!errors["startTime"]) setErrors({
                                                ...errors,
                                                ["startTime"]: null
                                            })
                                        }}
                                        // max={new Date().toISOString().slice(0, 10)}
                                        isInvalid={errors.startTime}

                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.startTime}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className={"mb-3"} controlId={"formGroupStartTime"}>
                                    <Form.Label>End Time</Form.Label>
                                    <Form.Control
                                        type={"datetime-local"}
                                        value={endTime}
                                        onChange={(e) => {
                                            setEndTime(e.target.value)
                                            if (!!errors["endTime"]) setErrors({
                                                ...errors,
                                                ["endTime"]: null
                                            })
                                        }}
                                        // max={new Date().toISOString().slice(0, 10)}
                                        isInvalid={errors.endTime}

                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.endTime}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        {/*<Form.Group className={"mb-3"} controlId={"formGroupTaskDescription"}>*/}
                        {/*    <Form.Label>Task Description</Form.Label>*/}
                        {/*    <Form.Control*/}
                        {/*        as="textarea"*/}
                        {/*        type={"text"}*/}
                        {/*        rows={3}*/}
                        {/*        value={taskDescription}*/}
                        {/*        onChange={(e) => {*/}
                        {/*            setTaskDescription(e.target.value)*/}
                        {/*            if (!!errors["taskDescription"]) setErrors({*/}
                        {/*                ...errors,*/}
                        {/*                ["taskDescription"]: null*/}
                        {/*            })*/}
                        {/*        }}*/}
                        {/*        isInvalid={!!errors.taskDescription}*/}
                        {/*    />*/}
                        {/*    <Form.Control.Feedback type='invalid'>*/}
                        {/*        {errors.taskDescription}*/}
                        {/*    </Form.Control.Feedback>*/}
                        {/*</Form.Group>*/}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"custom-primary"} form={"editSprintForm"} type={"submit"}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}