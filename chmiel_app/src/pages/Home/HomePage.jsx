import {Col, Row, Stack, Container} from "react-bootstrap";
import {Navigation} from "../../components/Navigation/Navigation";
import "./HomePage.css"
import {useEffect, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ProjectComponent} from "../../components/ProfileComponents/ProjectComponent";
import useScreenSize from "../../other/useScreenSize";
import axios from "../../api/axios";
import {useCookies} from "react-cookie";
import WorkedOnContent from "./WorkedOnContent";
import ViewedContent from "./ViewedContent";
import AssignedToMeContent from "./AssignedToMeContent";


export const HomePage = () => {
    const [cookies] = useCookies(["token"]);
    const screenSize = useScreenSize();
    const [columnNum, setColumnNum] = useState(0);
    const [activeTab, setActiveTab] = useState("workedOn");
    const [projects, setProjects] = useState([])

    const generateTabContent = (tab) => {
        switch (tab) {
            case "workedOn":
                return <WorkedOnContent />;
            case "viewed":
                return <ViewedContent />;
            case "assignedToMe":
                return <AssignedToMeContent />;
            default:
                return null;
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    useEffect(() => {
        if (screenSize.width < 840) {
            setColumnNum(1)
        } else if (screenSize.width < 992) {
            setColumnNum(2)
        } else setColumnNum(3)
    }, [screenSize.width])
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/project/getByUserId',
                     {
                        headers: { Authorization: cookies.token }
                    });
                console.log(response.data)
                const projectsData = response.data.map(project => ({
                    id: project.id,
                    name: project.projectName,
                }));
                setProjects(projectsData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <>
            <Navigation />
            <Container fluid={"md"}>
                <div className={"homeContainer"}> 
                    <Stack gap={3}>
                        <h2>Your work</h2>
                        <div className={"recentProjectsContainer"}>
                            <div className={"projectsHeaderRow"}>
                                <div className={"projectsHeader"}>
                                    <h3>Recent Projects</h3>
                                </div>
                                <div className={"projectsLink"}>
                                        <a href="#">View all projects</a>
                                </div>
                            </div>
                            <div>
                                {projects.length !== 0 ? <Row sm={5}>
                                    {
                                        projects.slice(0, 5).map((project) => {
                                            return <Col><ProjectComponent project={project}/></Col>
                                        })
                                    }
                                </Row> : <></>}
                            </div>

                        </div>
                        <div className={"summaryContainer"}>
                            <div className="tabs">
                                <div
                                    className={`tab ${activeTab === "workedOn" && "active"}`}
                                    onClick={() => handleTabClick("workedOn")}
                                >
                                    Worked On
                                    <div className="tab-line"></div>
                                </div>
                                <div
                                    className={`tab ${activeTab === "viewed" && "active"}`}
                                    onClick={() => handleTabClick("viewed")}
                                >
                                    Viewed
                                    <div className="tab-line"></div>
                                </div>
                                <div
                                    className={`tab ${activeTab === "assignedToMe" && "active"}`}
                                    onClick={() => handleTabClick("assignedToMe")}
                                >
                                    Assigned to me
                                    <div className="tab-line"></div>
                                </div>
                            </div>
                            <div className="tab-content">
                                {generateTabContent(activeTab)}
                            </div>
                        </div>
                    </Stack>
                    
                    
                    
                </div>
            </Container>
        </>
    )
}