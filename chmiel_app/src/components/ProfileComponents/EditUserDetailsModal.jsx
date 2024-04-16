import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";

export const EditUserDetailsModal = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    useEffect(() => {
        setFirstName(props.accountDetails.firstName)
        setLastName(props.accountDetails.lastName)
        setEmail(props.accountDetails.email)
        setBirthDate(props.accountDetails.birthDate)
        setAddress(props.accountDetails.address)
        setPhoneNumber(props.accountDetails.phoneNumber)
    }, [modalShow])

    const onFormSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            setValidated(false);
        //     handle successful validation of data here
            props.editUser(firstName, lastName, email, birthDate, address, phoneNumber);
            setModalShow(false);
        // if (shipping) {
        //     setPayment(true);
        //     setShipping(false);
        // } else if (payment) {
        //     setPayment(false);
        //     setReview(true);
        // }
        }
    }

    return (
        <>
            <Button variant={"custom-primary"} onClick={() => setModalShow(true)}>Edit details</Button>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                backdrop={"static"}
                centered
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit User Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id={"editUserForm"} noValidate validated={validated} onSubmit={onFormSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className={"mb-3"} controlId={"formGroupFirstName"}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control required
                                                  type={"text"}
                                                  value={firstName}
                                                  onChange={(e) => {
                                                      setFirstName(e.target.value)
                                                  }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className={"mb-3"} controlId={"formGroupLastName"}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control required
                                                  type={"text"}
                                                  value={lastName}
                                                  onChange={(e) => {
                                                      setLastName(e.target.value)
                                                  }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className={"mb-3"} controlId={"formGroupEmail"}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control required
                                          type={"text"}
                                          value={email}
                                          onChange={(e) => {
                                              setEmail(e.target.value)
                                          }}
                            />
                        </Form.Group>
                        <Form.Group className={"mb-3"} controlId={"formGroupAddress"}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type={"text"}
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className={"mb-3"} controlId={"formGroupBirthDate"}>
                                    <Form.Label>Birth Date</Form.Label>
                                    <Form.Control
                                                  type={"date"}
                                                  value={birthDate}
                                                  onChange={(e) => {
                                                      setBirthDate(e.target.value)
                                                  }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className={"mb-3"} controlId={"formGroupPhoneNumber"}>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                                  type={"text"}
                                                  value={phoneNumber}
                                                  onChange={(e) => {
                                                      setPhoneNumber(e.target.value)
                                                  }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                    {/*<Form noValidate validated={validated} onSubmit={onFormSubmit}>*/}
                    {/*    <Row>*/}
                    {/*        <Col>*/}
                    {/*            <Form.Group className={"mb-3"} controlId={"formGroupFirstName"}>*/}
                    {/*                <Form.Label>First Name</Form.Label>*/}
                    {/*                <Form.Control required*/}
                    {/*                              type={"text"}*/}
                    {/*                              placeholder={accountDetails.firstName}*/}

                    {/*                />*/}
                    {/*                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
                    {/*            </Form.Group>*/}
                    {/*        </Col>*/}
                    {/*        <Col>*/}
                    {/*            <Form.Group className={"mb-3"} controlId={"formGroupLastName"}>*/}
                    {/*                <Form.Label>Last Name</Form.Label>*/}
                    {/*                <Form.Control required*/}
                    {/*                              type={"text"}*/}
                    {/*                              placeholder={accountDetails.lastName}*/}
                    {/*                    // onChange={onInputEmail}*/}
                    {/*                    // value={email}*/}
                    {/*                />*/}
                    {/*                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
                    {/*            </Form.Group>*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*    <Form.Group className={"mb-3"} controlId={"formGroupEmail"}>*/}
                    {/*        <Form.Label>Email</Form.Label>*/}
                    {/*        <Form.Control required*/}
                    {/*                      type={"email"}*/}
                    {/*                      placeholder={accountDetails.email}*/}
                    {/*                      onChange={(e) => {*/}
                    {/*                          setEmail(e.target.value)*/}
                    {/*                      }}*/}
                    {/*                      value={email}*/}
                    {/*        />*/}
                    {/*        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
                    {/*    </Form.Group>*/}
                    {/*    <Row>*/}
                    {/*        <Col>*/}
                    {/*            <Form.Group className={"mb-3"} controlId={"formGroupAddress"}>*/}
                    {/*                <Form.Label>Address</Form.Label>*/}
                    {/*                <Form.Control*/}
                    {/*                    type={"text"}*/}
                    {/*                    placeholder={accountDetails.address}*/}
                    {/*                    // onChange={onInputEmail}*/}
                    {/*                    // value={email}*/}
                    {/*                />*/}
                    {/*                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
                    {/*            </Form.Group>*/}
                    {/*        </Col>*/}
                    {/*        <Col>*/}
                    {/*            <Form.Group className={"mb-3"} controlId={"formGroupPhoneNumber"}>*/}
                    {/*                <Form.Label>Phone Number</Form.Label>*/}
                    {/*                <Form.Control*/}
                    {/*                    type={"text"}*/}
                    {/*                    placeholder={accountDetails.phoneNumber}*/}
                    {/*                    // onChange={onInputEmail}*/}
                    {/*                    // value={email}*/}
                    {/*                />*/}
                    {/*                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
                    {/*            </Form.Group>*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*    <Form.Group>*/}
                    {/*        <Button type={"submit"} variant={"custom-primary"}>*/}
                    {/*            Save Changes*/}
                    {/*        </Button>*/}
                    {/*    </Form.Group>*/}
                    {/*</Form>*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"custom-primary"} form={"editUserForm"} type={"submit"}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}