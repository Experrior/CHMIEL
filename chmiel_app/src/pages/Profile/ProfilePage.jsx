import {Col, Row, Stack, Container} from "react-bootstrap";
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
import {EditUserDetailsModal} from "../../components/ProfileComponents/EditUserDetailsModal";

export const ProfilePage = () => {
    const [cookies] = useCookies(["token"]);
    const screenSize = useScreenSize();
    const [columnNum, setColumnNum] = useState(0)
    const [accountDetails, setAccountDetails] = useState({})

    const [projects, setProjects] = useState([
        // {id: 1, name: "testProject1"},
        // {id: 2, name: "testProject2"},
        // {id: 3, name: "testProject3"},
        // {id: 4, name: "testProject4"}
    ])
    const [projects2, setProjects2] = useState([
        // {id: 1, name: "testProject1"},
        // {id: 2, name: "testProject2"},
        // {id: 3, name: "testProject3"}
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

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200, // 992
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 500,
                    infinite: false,
                    dots: false
                }
            }
        ]
    };


    const getUserDetails = async () => {
        return await axios.get("/api/user", {
            headers: {
                Authorization: "Bearer " + cookies.token
            }
        })
    }

    const getUserConnections = async () => {
        return await axios.get("/api/user/getConnections", {
            headers: {
                Authorization: "Bearer " + cookies.token
            }
        })
    }

    const getUserProjects = async () => {
        return await axios.get("/api/project/getByUserId", {
            headers: {
                Authorization: "Bearer " + cookies.token
            }
        })
    }

    const editUser = async (firstName, lastName, email, birthDate, address, phoneNumber) => {
        await axios.put("/api/user",
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                birthDate: birthDate,
                address: address,
                phoneNumber: phoneNumber
            }, {
                headers: {
                    Authorization: "Bearer " + cookies.token
                }
            }).then(result => {
            console.log(result.data)
            setAccountDetails(result.data)
        }).catch(e => {
            console.error(e)
        })
    }



    useEffect(() => {
        // if (screenSize.width < 992) {
        //     setColumnNum(1)}
        if (screenSize.width < 1200) {
            setColumnNum(2)
        } else setColumnNum(3)
        console.log(columnNum)
    }, [screenSize.width])

    useEffect(() => {
        getUserDetails().then(results => {
            console.log(results.data)
            setAccountDetails(results.data)
        }).catch(e => {
            console.error(e);
        })
        getUserConnections().then(results => {
            console.log(results.data)
            setUserConnections(results.data)
        }).catch(e => {
            console.error(e);
        })
        getUserProjects().then(results => {
            console.log(results.data)
            const projectsData = results.data.map(project => ({
                id: project.id,
                name: project.projectName,
            }));
            setProjects(projectsData)
            setProjects2(projectsData)
        }).catch(e => {
            console.log(e);
        })

    }, [])


    return (
        <>
            <Navigation fixed={"top"}/>
            <div className={"profileImageBackground"}/>
            <Container fluid={"md"}>
                <div className={"profileContainer"}>
                        <div className={"profileDetailsContainer"}>
                            <div className={"profilePicture"}><p>{accountDetails.firstName ? accountDetails.firstName[0] : ""}{accountDetails.lastName ? accountDetails.lastName[0] : ""}</p></div>
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
                            <EditUserDetailsModal accountDetails={accountDetails} editUser={editUser}/>
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
                                    </Row> : <>You haven't worked on anything yet.</>)}
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
                                    </Row> : <>You haven't worked on anything yet.</>)}
                                </div>
                            </div>
                            <div>
                                <h3>Connections</h3>
                                <div className={"profileProjectsConnections"}>
                                    {userConnections.length !== 0 ? <Row>
                                        {
                                            userConnections.map((userConnection) => {
                                                return (
                                                    <Row key={userConnection.email}>
                                                        <Col xs={12}>
                                                            <div style={{ marginBottom: 16 }}>
                                                                <p>{userConnection.email}</p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                );
                                            })
                                        }
                                    </Row> : <></>}
                                </div>
                            </div>
                        </Stack>
                    </div>
                </div>
            </Container>
            
        </>
    )
}