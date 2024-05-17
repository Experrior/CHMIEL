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
    const [selectedProject, setSelectedProject] = useState(useParams()); // State to hold the selected project
    const { projectId } = useParams();
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
                const projectsData = response.data.map(project => ({
                    id: project.id,
                    name: project.projectName,
                }));
                setSelectedProject(projectId);
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
                setSprintsData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        fetchEpicsData();
        fetchChosenProject();
        fetchSprintsData();


        // return () => clearInterval(interval);
    }, [projectId]); // Run whenever selectedProject changes

    return (
        <>
            <Navigation/>

            <div style={{display: "flex"}}>
                <SidebarMenu project={1} from={"charts"}/>
                <Container fluid={"md"}>
                <Col>
                <Row>
                    <Col>
                        <div className="text-center" style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%'
                        }}>
                            <h1 style={{ margin: '0'}}>Analytic charts</h1>
                            <h3 style={{ margin: '0'}}>Here are displayed charts with various measures, for given scrum project.</h3>
                        </div>
                    </Col>
                </Row>
                    <Row>
                        <Col>
                            <div>
                                <br/>
                                <div>
                                </div>
                                <br/>
                                <br/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div style={{marginLeft: '100px'}}>
                                <DropdownButton id="dropdown-basic-button"
                                                title={selectedProject ? selectedProject.name : "Project"}>
                                {projects.map(project => (
                                        <Dropdown.Item
                                            key={project.id}
                                            value={project.id}
                                            onClick= {
                                            () => {
                                                setSelectedProject(project)
                                                navigate('/charts/' + project.id)
                                            }

                                        }
                                        >
                                            {project.name}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>
                            <div>
                                <br/>
                                <br/>
                                <br/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <EpicsChartsComponent inputData={epicsData}/>
                        </Col>
                        {/*<Col>*/}
                        {/*    <SprintChartsComponent2 inputData={sprintsData}/>*/}
                        {/*</Col>*/}
                        <Col>
                            <SprintChartsComponent inputData={sprintsData}/>
                        </Col>
                    </Row>
                </Col>
                </Container>
                
            </div>
        </>
    );
};

export default ChartsPage;
