import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';
import { MenuItem } from 'react-pro-sidebar';
import {useCookies} from "react-cookie";
import axios from "../../api/axios";
import {UserComponent} from "./UserComponent";
import {useParams} from "react-router-dom";


export const RemoveUserModal = (props) => {
    let {projectId} = useParams()
    const [modalShow, setModalShow] = useState(false);
    const [userEmail, setUserEmail] = useState({});
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);
    const [cookies] = useCookies(["token"]);

    const [users, setUsers] = useState([]);

    const [usersToRemove, setUsersToRemove] = useState([]);


    const findFormErrors = () => {
        const newErrors = {}
        // if (!findUser(userEmail)) newErrors.userEmail = 'No user with such email'
        return newErrors
    }

    useEffect(() => {
        const getAllUsers = async () => {
            await axios.get(`/api/project/getAllUsers/${projectId}`, {
                headers: { Authorization: `Bearer ${cookies.token}` }
            }).then(response => {
                setUsers(response.data)
            }).catch(error => {
                console.log(error)
            })
        };

        if(usersToRemove.length === 0) {
            getAllUsers();
        }
    })

    const deleteUser = (user) => {
        return () => {
            setUsersToRemove([...usersToRemove, user])
            setUsers(users.filter(u => u.id !== user.id))
        }
    }

    const undoDeleteUser = (user) => {
        return () => {
            setUsers([...users, user])
            setUsersToRemove(usersToRemove.filter(u => u.id !== user.id))
        }
    }

    const onConfirm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            for (let user of usersToRemove) {
                props.removeUserFromProject(user.id);
            }
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
                                <FontAwesomeIcon icon={faUserTimes}/>
                            </div>
                            <div className="text">Remove users</div>
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
                <Modal.Title>Remove users</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
                            
                { users.length !== 0 ? 
                    (
                        users.map((user) => {
                            return <UserComponent user={user} deleteUser={deleteUser(user)}/>
                        })
                    ) : <><p></p></>
                }
                            
            </Row> 
            <Row>
                <h5>Users to remove:</h5>
                {
                    usersToRemove.length !== 0 ?
                        (
                            usersToRemove.map((user) => {
                                return <p>{user.firstName} {user.lastName} <FontAwesomeIcon icon={faTrashAlt} onClick={undoDeleteUser(user)} className="icon"/></p>
                            })
                        ) : <><p></p></>
                }
            </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"custom-primary"} onClick={onConfirm}>Confirm</Button>
            </Modal.Footer>
            </Modal>
        </>
    );
}