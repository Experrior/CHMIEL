import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';
import { MenuItem } from 'react-pro-sidebar';
import {useCookies} from "react-cookie";
import axios from "../../api/axios";


export const AddUsersModal = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [userEmail, setUserEmail] = useState({});
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);
    const [cookies] = useCookies(["token"]);

    const [users, setUsers] = useState([]);


    const findUser = (email) => {
        return users.find(user => user.email === email)
    }

    const findFormErrors = () => {
        const newErrors = {}
        if (!findUser(userEmail)) newErrors.userEmail = 'No user with such email'
        return newErrors
    }

    useEffect(() => {
        const getAllUsers = async () => {
            await axios.get(`/api/user/getAll`, {
                headers: { Authorization: `Bearer ${cookies.token}` }
            }).then(response => {
                setUsers(response.data)
            }).catch(error => {
                console.log(error)
            })
        };
        getAllUsers();
    }, [])

    useEffect(() => {
        setUserEmail("")
    }, [modalShow])

    const onConfirm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            const user = findUser(userEmail)
            props.addUsersToProject(user.id);
            setModalShow(false);
            setErrors({})
        }
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
                    setErrors({})
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
            <Form id={"addUserForm"} noValidate validated={validated} onSubmit={onConfirm}>
                        <Row>
                            <Col>
                                <Form.Group className={"mb-3"} controlId={"formGroupUserEmail"}>
                                    <Form.Label>Enter user email:</Form.Label>
                                    <Form.Control required
                                                  type={"text"}
                                                  value={userEmail}
                                                  onChange={(e) => {
                                                      setUserEmail(e.target.value)
                                                      if (!!errors["userEmail"]) setErrors({
                                                        ...errors,
                                                        ["userEmail"]: null
                                                    }) 
                                                  }}
                                                  isInvalid={!!errors.userEmail}
                                    />
                                </Form.Group>
                                <Form.Control.Feedback type='invalid'>
                                        {errors.userEmail}
                                    </Form.Control.Feedback>
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