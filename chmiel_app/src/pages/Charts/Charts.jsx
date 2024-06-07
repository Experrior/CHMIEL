import { Container, Nav, Col, Row } from 'react-bootstrap';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import DropdownButton from 'react-bootstrap/DropdownButton';
import default_profile_picture from "../../assets/default_profile_picture.jpg";
import Dropdown from 'react-bootstrap/Dropdown';
import {Navigation} from "../../components/Navigation/Navigation";
import {EpicsChartsComponent} from "../../components/Charts/EpicsChartsComponent";
import {SprintChartsComponent} from "../../components/Charts/SprintChartsComponent";
import {SprintChartsComponent2} from "../../components/Charts/SprintChartsComponent2";
import {useCookies} from "react-cookie";
import {SidebarMenu} from "../../components/Sidebar/Sidebar";
import React, { useState, useEffect } from 'react';
import axios from "../../api/axios";
import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {
    Routes,
    Route,
    useSearchParams,
    BrowserRouter
} from "react-router-dom"

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const generateRandomData = () => {
    return labels.map(() => Math.floor(Math.random() * 1000));
};


const ChartsPage = () => {
    const [cookies] = useCookies(["token"]);
    const [projects, setProjects] = useState([]);
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [epicsData, setEpicsData] = useState({});
    const [sprintsData, setSprintsData] = useState({});
    const { projectId } = useParams();
    const [selectedProject, setSelectedProject] = useState(projectId); // State to hold the selected project
    const [queryParameters] = useSearchParams()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/project/getByUserId', {
                    headers: { Authorization: `Bearer ${cookies.token}` }
                });
                const projectsData = response.data.map(project => ({
                    id: project.id,
                    name: project.projectName,
                }));
                console.log("CH: FetchData: ", projectsData)
                setProjects(projectsData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        const fetchChosenProject = async () => {
            try {
                const response = await axios.get('/api/project/getProjectByProjectId/' + projectId, {
                    headers: { Authorization: `Bearer ${cookies.token}` }
                });
                console.log(projectId)
                console.log(response.data)
                console.log("CH: FetchChosenProject: ", response.data)
                setSelectedProject(response.data);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        const fetchEpicsData = async () => {
            try {
                const response = await axios.get('/api/task/getEpicsData/' + projectId, {
                    headers: { Authorization: "Bearer " + cookies.token }
                });
                console.log("CH: FetchEpicsData: ", response.data)
                setEpicsData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchSprintsData = async() =>{
            try {
                const response = await axios.get('/api/sprint/getSprintsCompletionData/' + projectId, {
                    headers: { Authorization: "Bearer " + cookies.token }
                });
                console.log("CH: FetchSprintsData: ", response.data)
                setSprintsData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        fetchChosenProject();
        fetchEpicsData();
        fetchSprintsData();


        // return () => clearInterval(interval);
    }, [projectId]); // Run whenever selectedProject changes

    return (
        <>
            <Navigation sticky={"top"}/>
            <div style={{display: "flex"}}>
                <SidebarMenu from={"charts"}/>
                {/*<div style={{width: "100%"}}>*/}
                {/*    <div style={{padding: 15, width: "100%", display: "flex", alignItems: "baseline", justifyContent: "center", gap: 20}}>*/}
                {/*        <p style={{margin: 0, padding: 0, fontWeight: "bold"}}>Current Project:</p>*/}
                {/*        <DropdownButton style={{width: "fit-content"}} variant="custom-tertiary-v2"*/}
                {/*                        id="dropdown-basic-button"*/}
                {/*                        title={selectedProject ? selectedProject.projectName : "Project"}*/}
                {/*        >*/}
                {/*            {projects.map(project => (*/}
                {/*                <Dropdown.Item*/}
                {/*                    key={project.id}*/}
                {/*                    value={project.id}*/}
                {/*                    onClick={() => {*/}
                {/*                        setSelectedProject(project.id);*/}
                {/*                        navigate('/charts/' + project.id);*/}
                {/*                    }}*/}
                {/*                >*/}
                {/*                    {project.name}*/}
                {/*                </Dropdown.Item>*/}
                {/*            ))}*/}
                {/*        </DropdownButton>*/}
                {/*    </div>*/}
                    <Container fluid="md" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                        <Row className="text-center" style={{ marginBottom: '20px' }}>
                            <Col>
                                <h1 style={{ margin: '0' }}>Analytic charts</h1>
                                <h3 style={{ margin: '0' }}>Here are displayed charts with various measures, for given scrum project.</h3>
                            </Col>
                        </Row>
                        <Row className="my-4" >
                            <Col className="text-center" style={{display: "flex", alignItems: "baseline", justifyContent: "center", gap: 20}}>
                                <p style={{margin: 0, padding: 0, fontWeight: "bold"}}>Current Project:</p>
                                <DropdownButton style={{width: "fit-content"}} variant="custom-tertiary-v2"
                                                id="dropdown-basic-button"
                                                title={selectedProject ? selectedProject.projectName : "Project"}
                                >
                                    {projects.map(project => (
                                        <Dropdown.Item
                                            key={project.id}
                                            value={project.id}
                                            onClick={() => {
                                                setSelectedProject(project.id);
                                                navigate('/charts/' + project.id);
                                            }}
                                        >
                                            {project.name}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </Col>
                        </Row>
                        <Row className="mt-4" style={{display: "flex", gap: 60, justifyContent: "center"}}>
                            <Col md={5}>
                                <EpicsChartsComponent inputData={epicsData} />
                            </Col>
                            <Col md={5}>
                                <SprintChartsComponent inputData={sprintsData} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            {/*</div>*/}
        </>
    );
};

export default ChartsPage;
