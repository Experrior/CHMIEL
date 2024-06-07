import {Col, Row, Stack, Container} from "react-bootstrap";
import {Navigation} from "../../components/Navigation/Navigation";
import "./ProjectsPage.css"
import {useEffect, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ProjectComponent} from "../../components/ProfileComponents/ProjectComponent";
import useScreenSize from "../../other/useScreenSize";
import axios from "../../api/axios";
import {useCookies} from "react-cookie";
import { CreateProjectModal } from "../../components/Projects/CreateProjectModal";


export const ProjectsPage = () => {
    const [cookies] = useCookies(["token"]);
    const screenSize = useScreenSize();
    const [columnNum, setColumnNum] = useState(0);
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState({});

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

    const addProject = async (projectName) => {
        console.log("Adding project")
        console.log(projectName)
        console.log(user.id)
        await axios.post(`/api/project/createProject`, projectName,
        {
            headers: {
                Authorization: `Bearer ${cookies.token}`,
                'Content-Type': 'text/plain'
            }
        }).then(response => {
            console.log(response)
            setProjects([...projects, {id: response.data.id, name: response.data.projectName}])
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {

        const getUser = async () => {
            try {
                const response = await axios.get("/api/user",
                    { headers: { Authorization: `Bearer ${cookies.token}` } }
                );
                console.log("Current user: ");
                console.log(response.data);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchProjects = async () => {
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

        getUser();
        fetchProjects();
    }, []);

    return (
        <>
            <Navigation sticky={"top"}/>
            <Container fluid={"md"}>
                    <Stack gap={3}>
                        <h2 className={"projectsHeader"}>Projects</h2>
                        <CreateProjectModal addProject={addProject}/>
                        <div className={"recentProjectsContainer"}>
                                {projects.length !== 0 ? <Row sm={5}>
                                    {
                                        projects.map((project) => {
                                            return <Col><ProjectComponent project={project}/></Col>
                                        })
                                    }
                                </Row> : <>You don't have any projects yet. <a style={{fontWeight: 'bold'}}href="#">Create your first project.</a></>}

                        </div>
                    </Stack>
            </Container>
        </>
    )
}