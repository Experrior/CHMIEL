import {Alert, Button, Form, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";

export const DeleteSprintModal = (props) => {
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
    }, [modalShow])


    return (
        <>
            <Button variant={"custom-tertiary-v3"} onClick={() => setModalShow(true)}>Delete Sprint</Button>
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
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Sprint
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete sprint with name {props.sprint.sprintName}?</p>
                </Modal.Body>
                <Modal.Footer>
                    {/*<Button variant={"custom-primary"} onClick={() => console.log("cancel")}>Cancel</Button>*/}
                    <Button variant={"custom-primary"} onClick={() => props.deleteSprint(props.sprint.id)}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}