import {useEffect, useRef, useState} from "react";
import axios from "../api/axios";
import {useCookies} from "react-cookie";
import "./AuthenticationPage.css"
import background from "../components/bg.png"
import {Button, Form} from "react-bootstrap";

export const RegisterPage = () => {
    const errRef = useRef();
    const [errorMsg, setErrorMsg] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const [cookies, setCookie] = useCookies(['token']);

    useEffect(() => {
        setErrorMsg("");
    }, [firstName, lastName, email, password])

    const onInputFirstName = ({target: {value}}) => setFirstName(value)
    const onInputLastName = ({target: {value}}) => setLastName(value)
    const onInputEmail = ({target: {value}}) => setEmail(value)
    const onInputPass = ({target: {value}}) => setPassword(value)

    const onFormSubmit = async e => {
        e.preventDefault()

        try {
            const response = await axios.post("/api/auth/register",
                JSON.stringify({firstname: firstName, lastname: lastName, email: email, password: password}),
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
    }


    return (
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
            {/*<div className={"imageCover"}>*/}
            {/*    <img src={background}/>*/}
            {/*</div>*/}
            <div style={{width: "50%", height: "100%", display: "flex", flexDirection: "column"}}>
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
                    <Form onSubmit={onFormSubmit}>
                        <Form.Group className={"mb-3"} controlId={"formGroupEmail"}>
                            <Form.Control type={"email"} placeholder={"Email"} onChange={onInputEmail}
                                          value={email}/>
                        </Form.Group>
                        <Form.Group className={"mb-3"} controlId={"firstNameGroup"}>
                            <Form.Control placeholder={"First Name"} onChange={onInputFirstName}
                                          value={firstName}/>
                        </Form.Group>
                        <Form.Group className={"mb-3"} controlId={"lastNameGroup"}>
                            <Form.Control placeholder={"Last Name"} onChange={onInputLastName}
                                          value={lastName}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Control type="password" placeholder="Password" onChange={onInputPass}
                                          value={password}/>
                        </Form.Group>

                        <p ref={errRef} className={errorMsg ? "errmsg" : "offscreen"}
                           aria-live={"assertive"}>{errorMsg}
                        </p>

                        <Form.Group as={"div"}>
                            <Button variant={"custom-primary"} size={"lg"} style={{width: "100%"}}
                                    type="submit">SIGN UP</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>

    );
}