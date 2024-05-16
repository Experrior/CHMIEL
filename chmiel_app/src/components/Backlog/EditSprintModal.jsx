import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";

export const EditSprintModal = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const [sprintName, setSprintName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [isStarted, setIsStarted] = useState(false);

    // const [taskDescription, setTaskDescription] = useState("");
    const [errors, setErrors] = useState({})


    useEffect(() => {
        console.log(props.sprint)
        setSprintName(props.sprint.sprintName)
        setStartTime(formatDateTimeForInput(props.sprint.startTime))
        setEndTime(formatDateTimeForInput(props.sprint.stopTime))
        setIsStarted(props.sprint.isStarted)

        // setTaskDescription("")
    }, [modalShow])

    function formatDateTimeForInput(dateTimeString) {
        if (!dateTimeString) {
            return null;  // Return null if the API date is null
        }

        // Create a Date object from the ISO string
        const date = new Date(dateTimeString);

        // Convert to YYYY-MM-DDTHH:MM format (ignore seconds and timezone for `datetime-local`)
        let year = date.getUTCFullYear();
        let month = (date.getUTCMonth() + 1).toString().padStart(2, '0');  // getUTCMonth() returns 0-11
        let day = date.getUTCDate().toString().padStart(2, '0');
        let hours = date.getUTCHours().toString().padStart(2, '0');
        let minutes = date.getUTCMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }


    const findFormErrors = () => {
        const newErrors = {}
        if (!sprintName || sprintName === '') newErrors.sprintName = 'Sprint name is required!'

        if (endTime && !startTime) newErrors.startTime = 'Please provide an start date to accompany the end date!'

        if (startTime && !endTime) newErrors.endTime = 'Please provide an end date to accompany the start date!'
        else if (startTime && compareDates(startTime, endTime)) newErrors.endTime = 'End time needs to be after start time'
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
            props.editSprint(props.sprint.id, sprintName, startTime === "" ? null : startTime, endTime === "" ? null : endTime,
                props.sprint.started, props.sprint.finished)
            setModalShow(false);
            setErrors({})
        }
    }

    const compareDates = (startDate, endDate) => {
        // Convert input values to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Compare the dates
        return start > end;
    }

    return (<>
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
                                              ...errors, ["sprintName"]: null
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
                                            ...errors, ["startTime"]: null
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
                                            ...errors, ["endTime"]: null
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
    </>);
}