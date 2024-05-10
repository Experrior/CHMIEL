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

const data = {
    labels,
    datasets: [
        {
            type: 'line',
            label: 'Dataset 1',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: generateRandomData(),
        },
        {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: 'rgb(75, 192, 192)',
            data: generateRandomData(),
            borderColor: 'white',
            borderWidth: 2,
        },
        {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: 'rgb(53, 162, 235)',
            data: generateRandomData(),
        },
    ],
};



const ChartsPage = () => {
    const [cookies] = useCookies(["token"]);
    const [projects, setProjects] = useState([]);
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [epicsData, setEpicsData] = useState({});
    const [sprintsData, setSprintsData] = useState({});
    const [selectedProject, setSelectedProject] = useState(null); // State to hold the selected project


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/task/getEpicsData/1',
                    {
                        headers: { Authorization: "Bearer "+cookies.token }
                    }
                    );
                setEpicsData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            try {
                const response = await axios.get('/api/project/getByUserId',
                    {
                        headers: { Authorization: `Bearer ${cookies.token}` }
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
        fetchData();
    }, []); // Run only once on component mount

    return (
        <>
            <Navigation/>

            <div style={{display: "flex", margin: "16px"}}>
                <SidebarMenu project={1} from={"board"}/>
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
                                <br/>
                                <br/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{marginLeft: '100px'}}>
                                <DropdownButton id="dropdown-basic-button" title={selectedProject ? selectedProject.name : "Project"}>
                                    {projects.map(project => (
                                        <Dropdown.Item
                                            key={project.id}
                                            value={project.id}
                                            onClick={() => setSelectedProject(project)} // Update selected project on click
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
                        <Col>
                            <SprintChartsComponent2 inputData={sprintsData}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SprintChartsComponent inputData={sprintsData}/>
                        </Col>
                    </Row>
                </Col>
            </div>
        </>
    );
};






// const ChartsPage = () => {
//     const [epicsData, setEpicsData] = useState({});
//     const [sprintsData, setSprintsData] = useState({});
//     const [cookies] = useCookies(["token"]);
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('/api/task/getEpicsData/1',
//                     {
//                         headers: { Authorization: "Bearer "+cookies.token }
//                     }
//                     );
//                 setEpicsData(response.data);
//                 console.log(response.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//             try {
//                 const response = await axios.get('/api/project/getByUserId',
//                     {
//                         headers: { Authorization: `Bearer ${cookies.token}` }
//                     });
//                 console.log(response.data)
//                 const projectsData = response.data.map(project => ({
//                     id: project.id,
//                     name: project.projectName,
//                 }));
//                 setProjects(projectsData);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []); // Run only once on component mount
//
//     const handleSelectOption = (option) => {
//         setSelectedOption(option.label);
//         setSelectedData(option.value);
//     };
//     const predefinedDataOptions = [
//         { label: 'Option 1', value: 'data1' },
//         { label: 'Option 2', value: 'data2' },
//         { label: 'Option 3', value: 'data3' }
//     ];
//
//
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [selectedData, setSelectedData] = useState(null);
//
//     const handleButtonClick = (option) => {
//         setSelectedOption(option.label);
//         setSelectedData(option.value);
//     };
//
//
//
//     return (
//         <>
//             <Navigation/>
//
//             <div style={{display: "flex"}}>
//                 <SidebarMenu project={1} from={"board"}/>
//                 <Col>
//                 <Row>
//                     <Col>
//                         <div className="text-center" style={{
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             height: '100%'
//                         }}>
//                             <h1 style={{ margin: '0'}}>Analytic charts</h1>
//                             <h3 style={{ margin: '0'}}>Here are displayed charts with various measures, for given scrum project.</h3>
//                         </div>
//                     </Col>
//                 </Row>
//     <Row>
//         <Col>
//             <div>
//                 <h3>Selected Option: {selectedOption}</h3>
//                 <div className="dropdown">
//                     <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
//                             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                         Select Project
//                     </button>
//                     <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                         {projects.map((project, index) => (
//                             <button key={index} className="dropdown-item"
//                                     onClick={() => handleSelectOption({label: project.projectName, value: project.id})}>
//                                 {project.name}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//
//                 {/* Render selected data */}
//                 {selectedData && (
//                     <div>
//                         <h4>Selected Data: {selectedData}</h4>
//                         {/* Render data based on selectedData */}
//                         {/* You can use conditional rendering or switch case statement here */}
//                     </div>
//                 )}
//             </div>
//         </Col>
//     </Row>
//                     <Row>
//                         <Col>
//                             <EpicsChartsComponent inputData={epicsData}/>
//                         </Col>
//                         <Col>
//                             <SprintChartsComponent inputData={sprintsData}/>
//                         </Col>
//                     </Row>
//                 </Col>
//             </div>
//         </>
//     );
// };
//
export default ChartsPage;
