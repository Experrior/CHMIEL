import {Button, Col, Form, Modal, Row, Stack} from "react-bootstrap";
import {Navigation} from "../../components/Navigation/Navigation";
import "./ProfilePage.css"
import default_profile_picture from "../../assets/default_profile_picture.jpg"
import {useEffect, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {ProjectComponent} from "../../components/ProfileComponents/ProjectComponent";
import useScreenSize from "../../other/useScreenSize";
import axios from "../../api/axios";
import {useCookies} from "react-cookie";

export const ProfilePage = () => {
    const [cookies] = useCookies(["token"]);
    const screenSize = useScreenSize();
    const [columnNum, setColumnNum] = useState(0)
    const [accountDetails, setAccountDetails] = useState({})
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    // EditUserDetailsModal
    const [modalShow, setModalShow] = useState(false);
    const [validated, setValidated] = useState(false);

    function EditUserDetailsModal(props) {
        return (
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                backdrop={"static"}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                keyboard={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit User Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={onFormSubmit}>
                        {/*<Row>*/}
                        {/*    <Col>*/}
                        {/*        /!*<Form.Group className="mb-3" controlId="formGroupFirstName">*!/*/}
                        {/*        /!*    <Form.Label>First Name</Form.Label>*!/*/}
                        {/*        /!*    <Form.Control required*!/*/}
                        {/*        /!*                  type="text"*!/*/}
                        {/*        /!*                  placeholder="FirstName"*!/*/}
                        {/*        /!*                  onChange={onInputFirstName}*!/*/}
                        {/*        /!*                  value={firstName}*!/*/}
                        {/*        /!*    />*!/*/}
                        {/*        /!*    <Form.Control.Feedback type="invalid">*!/*/}
                        {/*        /!*        Please enter first name.*!/*/}
                        {/*        /!*    </Form.Control.Feedback>*!/*/}
                        {/*        /!*</Form.Group>*!/*/}
                        {/*    </Col>*/}
                        {/*    <Col>*/}
                        {/*        <Form.Group className="mb-3" controlId="formGroupFirstName">*/}
                        {/*            <Form.Label>Last Name</Form.Label>*/}
                        {/*            <Form.Control required*/}
                        {/*                          type="text"*/}
                        {/*                          placeholder="LastName"*/}
                        {/*                          onChange={(e) => {*/}
                        {/*                              setLastName(e.target.value)*/}
                        {/*                              setValidated(false)*/}
                        {/*                          }*/}
                        {/*                          }*/}
                        {/*                          value={lastName}*/}
                        {/*            />*/}
                        {/*            <Form.Control.Feedback type="invalid">*/}
                        {/*                Please enter last name.*/}
                        {/*            </Form.Control.Feedback>*/}
                        {/*        </Form.Group>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                        <Form.Group className={"mb-3"} controlId={"formGroupEmail"}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control required
                                          type={"email"}
                                          placeholder={"Email"}
                                          onChange={onInputEmail}
                                          value={email}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button variant="primary" onClick={() => setModalShow(false)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const getUserDetails = async () => {
        return await axios.get("/api/user", {
            headers: {
                Authorization: "Bearer " + cookies.token
            }
        })
    }

    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);

        } else {
            e.preventDefault();
            e.stopPropagation();
            setValidated(false);

            // if (shipping) {
            //     setPayment(true);
            //     setShipping(false);
            // } else if (payment) {
            //     setPayment(false);
            //     setReview(true);
            // }
        }
    }

    const onInputEmail = ({target: {value}}) => {
        setEmail(value)
        // setValidated(false)
        console.log("test")
    }


    useEffect(() => {
        getUserDetails().then(results => {
            console.log(results.data)
            setAccountDetails(results.data)
        }).catch(e => {
            console.error(e);
        })
    }, [])

    const [projects, setProjects] = useState([
        {id: 1, name: "testProject1"},
        {id: 2, name: "testProject2"},
        {id: 3, name: "testProject3"},
        {id: 4, name: "testProject4"}
    ])
    const [projects2, setProjects2] = useState([
        {id: 1, name: "testProject1"},
        {id: 2, name: "testProject2"},
        {id: 3, name: "testProject3"}
    ])
    const [userConnections, setUserConnections] = useState([
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
        {id: 8},
        {id: 9},
        {id: 10},
        {id: 11},
        {id: 12},
        {id: 13}
    ])

    useEffect(() => {
        if (screenSize.width < 840) {
            setColumnNum(1)
        } else if (screenSize.width < 992) {
            setColumnNum(2)
        } else setColumnNum(3)
        console.log(columnNum)
    }, [screenSize.width])

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 500,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 840,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    infinite: false,
                    dots: false
                }
            }
        ]
    };

    return (
        <>
            <Navigation/>
            <div className={"profileImageBackground"}/>
            <div className={"profileContainer"}>
                <div className={"profileDetailsContainer"}>
                    <img className={"profilePicture"} src={default_profile_picture} alt={"default profile picture"}/>
                    <h2>{accountDetails.firstName} {accountDetails.lastName}</h2>
                    <div className={"profileDetails"}>
                        <div>
                            <p className={"profileDetailsHeader"}>Basic Details</p>
                            <div className={"profileDetail"}>
                                <p>Date Of Birth</p>
                                {accountDetails.birthDate ? <p>{accountDetails.birthDate}</p> :
                                    <p style={{color: "lightgrey", fontStyle: "italic"}}>undefined</p>}
                            </div>
                            <div className={"profileDetail"}>
                                <p>Address</p>
                                {accountDetails.address ? <p>{accountDetails.address}</p> :
                                    <p style={{color: "lightgrey", fontStyle: "italic"}}>undefined</p>}
                            </div>
                        </div>
                        <div>
                            <p className={"profileDetailsHeader"}>Contact Information</p>
                            <div className={"profileDetail"}>
                                <p>Email</p>
                                <p>{accountDetails.email}</p>
                            </div>
                            <div className={"profileDetail"}>
                                <p>Phone Number</p>
                                {accountDetails.phoneNumber ? <p>{accountDetails.phoneNumber}</p> :
                                    <p style={{color: "lightgrey", fontStyle: "italic"}}>undefined</p>}
                            </div>
                        </div>
                    </div>
                    <Button variant={"custom-primary"} onClick={() => setModalShow(true)}>Edit details</Button>
                    <EditUserDetailsModal/>
                </div>
                <div className={"profileProjects"}>
                    <Stack gap={3}>
                        <div>
                            <h3>Worked on</h3>
                            <div className={"profileProjectsWorkedOnContainer"}>
                                {projects.length > columnNum ? <Slider {...settings}>
                                    {projects.map((project) => {
                                        return <ProjectComponent project={project}/>
                                    })}
                                </Slider> : (projects.length !== 0 ? <Row sm={3}>
                                    {
                                        projects.map((project) => {
                                            return <Col><ProjectComponent project={project}/></Col>
                                        })
                                    }
                                </Row> : <></>)}
                            </div>
                        </div>
                        <div>
                            <h3>Contributed to</h3>
                            <div className={"profileProjectsWorkedOnContainer"}>
                                {projects2.length > columnNum ? <Slider {...settings}>
                                    {projects2.map((project) => {
                                        return <ProjectComponent project={project}/>
                                    })}
                                </Slider> : (projects2.length !== 0 ? <Row sm={3}>
                                    {
                                        projects2.map((project) => {
                                            return <Col><ProjectComponent project={project}/></Col>
                                        })
                                    }
                                </Row> : <></>)}
                            </div>
                        </div>
                        <div>
                            <h3>Connections</h3>
                            <div className={"profileProjectsConnections"}>
                                {userConnections.length !== 0 ? <Row>
                                    {
                                        userConnections.map((userConnection) => {
                                            return <Col xs={2} md={3} lg={2} xxxl={1}> <img
                                                style={{width: "80%", borderRadius: "50%", marginBottom: 16}}
                                                src={default_profile_picture}
                                                alt={"default profile picture"}/>
                                            </Col>
                                        })
                                    }
                                </Row> : <></>}
                            </div>
                        </div>
                    </Stack>
                </div>
            </div>
        </>
    )
}