import {Button, Col, Row, Stack} from "react-bootstrap";
import {Navigation} from "../../components/Navigation/Navigation";
import "./ProfilePage.css"
import default_profile_picture from "../../assets/default_profile_picture.jpg"
import {useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {ProjectComponent} from "../../components/ProjectComponent";

export const ProfilePage = () => {
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

    // const SampleNextArrow = (props) => {
    //     const { className, style, onClick } = props;
    //     return (
    //         <div
    //             className={className}
    //             style={{ ...style, display: "block", background: "red" }}
    //             onClick={onClick}
    //         />
    //     );
    // }
    //
    // const SamplePrevArrow = (props) => {
    //     const { className, style, onClick } = props;
    //     return (
    //         <div
    //             className={className}
    //             style={{ ...style, display: "block", stroke: "grey"}}
    //             onClick={onClick}
    //         />
    //     );
    // }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />
    };
    const formatData = (data, numberOfColumns) => {
        let numberOfElementsInLastRow = data.length;
        while (numberOfElementsInLastRow !== numberOfColumns) {
            data.push({id: -1});
            numberOfElementsInLastRow++;
        }
        return data;
    }


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
                                {projects.length > 3 ? <Slider {...settings}>
                                    {projects.map((project) => {
                                        return <ProjectComponent project={project}/>
                                    })}
                                </Slider> : (projects.length !== 0 ? <Row lg={3}>
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
                                {projects2.length > 3 ? <Slider {...settings}>
                                    {projects2.map((project) => {
                                        return <ProjectComponent project={project}/>
                                    })}
                                </Slider> : (projects2.length !== 0 ? <Row lg={3}>
                                    {
                                        projects2.map((project) => {
                                            return <Col><ProjectComponent project={project}/></Col>
                                        })
                                    }
                                </Row> : <></>)}
                            </div>
                        </div>
                    </Stack>
                </div>
            </div>
        </>
    )
}