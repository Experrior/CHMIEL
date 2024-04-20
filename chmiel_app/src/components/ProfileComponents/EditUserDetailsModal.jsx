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
    const [errors, setErrors] = useState({})


    useEffect(() => {
        setFirstName(props.accountDetails.firstName)
        setLastName(props.accountDetails.lastName)
        setEmail(props.accountDetails.email)
        setBirthDate(props.accountDetails.birthDate)
        setAddress(props.accountDetails.address)
        setPhoneNumber(props.accountDetails.phoneNumber)
    }, [modalShow])

    const findFormErrors = () => {
        const newErrors = {}
        // name errors
        if (!firstName || firstName === '') newErrors.firstName = 'First name is required!'
        else if (firstName.match(/\d+/)) newErrors.firstName = 'First name cannot contain numbers'

        if (!lastName || lastName === '') newErrors.lastName = 'Last name is required!'
        else if (lastName.match(/\d+/)) newErrors.lastName = 'Last name cannot contain numbers'

        if (!email || email === '') newErrors.email = 'Email is required!'
        else if (!email.match(/.+@.+/)) newErrors.email = 'Email must contain "@"'

        if (Date.parse(birthDate) > new Date()) newErrors.birthDate = 'Birth date cannot be set to future'

        if (phoneNumber.match(/\d/g).length !== 9) {
            newErrors.phoneNumber = 'Phone number must consist of 9 numbers'
        } else if (phoneNumber.match(/.*[A-Za-z]+.*/)) newErrors.phoneNumber = 'Phone number cannot contain letters'

        return newErrors
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            props.editUser(firstName[0].toUpperCase() + firstName.slice(1), lastName[0].toUpperCase() + lastName.slice(1), email, birthDate, address, phoneNumber);
            setModalShow(false);
            setErrors({})
        }
    }

    return (
        <>
            <Button variant={"custom-primary"} onClick={() => setModalShow(true)}>Edit details</Button>
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
                                                      if (!!errors["firstName"]) setErrors({
                                                          ...errors,
                                                          ["firstName"]: null
                                                      })
                                                  }}
                                                  isInvalid={!!errors.firstName}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.firstName}
                                    </Form.Control.Feedback>
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
                                                      if (!!errors["lastName"]) setErrors({
                                                          ...errors,
                                                          ["lastName"]: null
                                                      })
                                                  }}
                                                  isInvalid={errors.lastName}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className={"mb-3"} controlId={"formGroupEmail"}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control required
                                          type={"email"}
                                          value={email}
                                          onChange={(e) => {
                                              setEmail(e.target.value)
                                              if (!!errors["email"]) setErrors({
                                                  ...errors,
                                                  ["email"]: null
                                              })
                                          }}
                                          isInvalid={errors.email}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.email}
                            </Form.Control.Feedback>
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
                                            if (!!errors["birthDate"]) setErrors({
                                                ...errors,
                                                ["birthDate"]: null
                                            })
                                        }}
                                        max={new Date().toISOString().slice(0, 10)}
                                        isInvalid={errors.birthDate}

                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.birthDate}
                                    </Form.Control.Feedback>
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
                                            if (!!errors["phoneNumber"]) setErrors({
                                                ...errors,
                                                ["phoneNumber"]: null
                                            })
                                        }}
                                        isInvalid={errors.phoneNumber}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.phoneNumber}
                                    </Form.Control.Feedback>
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