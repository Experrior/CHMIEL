import React, {useEffect, useRef, useState} from "react";
import axios from "../../api/axios";
import {useCookies} from "react-cookie";
import "./AuthenticationPage.css"
import {Button, Form} from "react-bootstrap";
import {Navigate} from "react-router-dom";

export const RegisterPage = () => {
    const errRef = useRef();
    const [errorMsg, setErrorMsg] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const [cookies, setCookie] = useCookies(['token']);
    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (cookies.token) {
            setSuccess(true)
        }
    }, [])

    useEffect(() => {
        setErrorMsg("");
    }, [firstName, lastName, email, password])

    const findFormErrors = () => {
        const newErrors = {}

        if (!email || email === '') newErrors.email = 'Email is required!'
        else if (!email.match(/.+@.+/)) newErrors.email = 'Email must contain "@" and mail name'

        if (!firstName || firstName === '') newErrors.firstName = 'First name is required!'
        else if (firstName.match(/\d+/)) newErrors.firstName = 'First name cannot contain numbers'

        if (!lastName || lastName === '') newErrors.lastName = 'Last name is required!'
        else if (lastName.match(/\d+/)) newErrors.lastName = 'Last name cannot contain numbers'

        if (!password || password === '') newErrors.password = 'Password is required!'
        else if (password.length < 8) newErrors.password = 'Password has to be at least 8 characters'
        else if (!password.match(/\d+/)) newErrors.password = 'Password must contain numbers'
        return newErrors
    }

    const onFormSubmit = async e => {
        e.preventDefault()
        e.stopPropagation();
        console.log("submitting")
        const newErrors = findFormErrors()
        console.log(newErrors)
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            try {
                const response = await axios.post("/api/auth/register",
                    JSON.stringify({firstName: firstName, lastName: lastName, email: email, password: password}),
                    {
                        headers: {"Content-Type": "application/json"},
                    });
                const accessToken = response.data.token;
                setCookie('token', accessToken);
                setEmail("")
                setPassword("")
                setFirstName("")
                setLastName("")
                setSuccess(true)
            } catch (e) {
                console.error(e)
                setErrorMsg("Registration failed.")
            }
            setErrors({})
        }
    }


    return (
        <>
            {success ? <Navigate to={"/"}/> :
                <div className={"authenticationContainer"}>
                    <div className={"authenticationTextContainer"}>
                        <div className={"mainAuthenticationText"}>
                            <p>Sign up to</p>
                            <p><span>Manage</span> Awesome</p>
                            <p>Projects!</p>
                        </div>
                        <div className={"secondaryAuthenticationText"}>
                            <p>If you already have account</p>
                            <p>you can <a href={"/login"}>login here</a>.</p>
                        </div>
                    </div>
                    <div className={"authFormNavContainer"}>
                        <div style={{
                            height: 100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "end",
                            paddingLeft: 64,
                            paddingRight: 64,
                            gap: 32
                        }}>
                            <Button href={"/login"} variant={"custom-secondary"}>Sign in</Button>
                            <Button href={"/register"} variant={"custom-secondary"}>Register</Button>
                        </div>
                        <div className={"formContainer"}>
                            <Form id={"registerForm"} noValidate validated={validated} onSubmit={onFormSubmit}>
                                <Form.Group className={"mb-3"} controlId={"formGroupEmail"}>
                                    <Form.Control required
                                                  type={"email"}
                                                  placeholder={"Email"}
                                                  onChange={(e) => {
                                                      setEmail(e.target.value)
                                                      if (!!errors["email"]) setErrors({
                                                          ...errors,
                                                          ["email"]: null
                                                      })
                                                  }}
                                                  isInvalid={!!errors.email}
                                                  value={email}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className={"mb-3"} controlId={"firstNameGroup"}>
                                    <Form.Control required
                                                  placeholder={"First Name"}
                                                  onChange={(e) => {
                                                      setFirstName(e.target.value)
                                                      if (!!errors["firstName"]) setErrors({
                                                          ...errors,
                                                          ["firstName"]: null
                                                      })
                                                  }}
                                                  isInvalid={!!errors.firstName}
                                                  value={firstName}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.firstName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className={"mb-3"} controlId={"lastNameGroup"}>
                                    <Form.Control required
                                                  placeholder={"Last Name"}
                                                  onChange={(e) => {
                                                      setLastName(e.target.value)
                                                      if (!!errors["lastName"]) setErrors({
                                                          ...errors,
                                                          ["lastName"]: null
                                                      })
                                                  }}
                                                  isInvalid={!!errors.lastName}
                                                  value={lastName}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Control required
                                                  type="password"
                                                  placeholder="Password"
                                                  onChange={(e) => {
                                                      setPassword(e.target.value)
                                                      if (!!errors["password"]) setErrors({
                                                          ...errors,
                                                          ["password"]: null
                                                      })
                                                  }}
                                                  isInvalid={!!errors.password}
                                                  value={password}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <p ref={errRef} className={errorMsg ? "errmsg" : "offscreen"}
                                   aria-live={"assertive"}>{errorMsg}
                                </p>

                                <Form.Group as={"div"}>
                                    <Button variant={"custom-primary"} size={"lg"} style={{width: "100%"}}
                                            form={"registerForm"} type="submit">SIGN UP</Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>}
        </>

    );
}