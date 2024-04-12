import {Button, Col, Row, Stack} from "react-bootstrap";
import {Navigation} from "../../components/Navigation/Navigation";
import "./ProfilePage.css"
import default_profile_picture from "../../assets/default_profile_picture.jpg"
import {useEffect, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {ProjectComponent} from "../../components/ProjectComponent";
import useScreenSize from "../../other/useScreenSize";

export const ProfilePage = () => {
    const screenSize = useScreenSize();
    const [columnNum, setColumnNum] = useState(0)
    const [accountDetails, setAccountDetails] = useState({name: "Jane Doe"})

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
                    <h2>{accountDetails.name}</h2>
                    <div className={"profileDetails"}>
                        <div>
                            <p className={"profileDetailsHeader"}>Basic Details</p>
                            <div className={"profileDetail"}>
                                <p>Date Of Birth</p>
                                <p>Date Of Birth</p>
                            </div>
                            <div className={"profileDetail"}>
                                <p>Address</p>
                                <p>Lake Gailmouth</p>
                            </div>
                        </div>
                        <div>
                            <p className={"profileDetailsHeader"}>Contact Information</p>
                            <div className={"profileDetail"}>
                                <p>Email</p>
                                <p>test@email.com</p>
                            </div>
                            <div className={"profileDetail"}>
                                <p>Phone Number</p>
                                <p>111 111 111</p>
                            </div>
                        </div>
                    </div>
                    <Button variant={"custom-primary"}>Edit details</Button>
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
                                            return <Col xs={2} md={3} lg={2} xxxl={1}> <img style={{width: "80%", borderRadius: "50%", marginBottom: 16}}
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