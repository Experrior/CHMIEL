import {Container, Nav, Col, Row, Button} from "react-bootstrap";
import ReactSearchBox from "react-search-box";
import {Navigation} from "../../components/Navigation/Navigation";
import {SidebarMenu} from "../../components/Sidebar/Sidebar";
import "./Board.css"
import {useEffect, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import default_profile_picture from "../../assets/default_profile_picture.jpg";
import useScreenSize from "../../other/useScreenSize";
import axios from "../../api/axios";
import {useCookies} from "react-cookie";
import { BoardComponent } from "../../components/Board/BoardComponent";
import {UserButtonsContainer} from "../../components/Board/UserButtonContainer";
import {useParams} from "react-router-dom";

export const Board = (props) => {
    let { projectId } = useParams();
    const [cookies] = useCookies(["token"]);

    const [project, setProject] = useState([]);
    const [sprint, setSprint] = useState([]);
    const [tasks, setTasks] = useState([])


    const getTasksFilteredByAssigneeId = async (assigneeId) => {
        console.log("id: ", assigneeId)
        console.log("sprintId: ", sprint.id)
        try {
            const response = await axios.get(`/api/task/getFilteredTasks?assigneeId=${assigneeId}&sprintId=${sprint.id}`,
                {
                    headers: {Authorization: `Bearer ${cookies.token}`}
                }
            )
            console.log(response.data)
            setTasks(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    const getTasks = async () => {
        console.log("Sprint: ", sprint)
        try {
            const response = await axios.get(`/api/task/getTasksBySprintId/${sprint.id}`,
                {
                    headers: {Authorization: `Bearer ${cookies.token}`}
                }
            )
            console.log('TASKS:')
            console.log(response.data)
            setTasks(response.data);
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await axios.get(`/api/project/getProjectByProjectId/${projectId}`,
                    {
                        headers: { Authorization: `Bearer ${cookies.token}` }
                    }
                )
                console.log(response.data)
                setProject(response.data);
                await getSprint()
            } catch (error) {
                console.log(error)
            }
        };

        const getSprint = async () => {
            try {
                const response = await axios.get(`/api/sprint/getCurrentSprint/${projectId}`,
                    {
                        headers: {Authorization: `Bearer ${cookies.token}`}
                    }
                )
                console.log("GetSprint: ", response.data)
                setSprint(response.data);
                setBoardName(response.data.sprintName + " Board")
                await getTasksBySprint(response.data)
            } catch (error) {
                console.log(error)
            }
        };

        const getTasksBySprint = async (sprintData) => {
            console.log("Sprint: ", sprint)
            try {
                const response = await axios.get(`/api/task/getTasksBySprintId/${sprintData.id}`,
                    {
                        headers: {Authorization: `Bearer ${cookies.token}`}
                    }
                )
                console.log('TASKS:')
                console.log(response.data)
                setTasks(response.data);
            } catch (error) {
                console.log(error)
            }
        };

        getProject()
        console.log(projectId)
    }, []);


    const [boardName, setBoardName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [newBoardName, setNewBoardName] = useState('');

    const handleEditClick = () => {
        setIsEditing(true);
        setNewBoardName(boardName);
    };

    const handleInputChange = (event) => {
        setNewBoardName(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            saveChanges();
        }
    };
    const handleBlur = () => {
        saveChanges();
    };

    const saveChanges = () => {
        setBoardName(newBoardName);
        setIsEditing(false);
    };

    const [showAllMembers, setShowAllMembers] = useState(false);
    const maxDisplayedMembers = 5;
    const maxTotalMembers = 10;

    const toggleShowAllMembers = () => {
        setShowAllMembers(!showAllMembers);
    };

    const [panels, setPanels] = useState([
        // ('backlog', 'open', 'in_progress', 'review', 'closed')
        // {id: 1, name: "BACKLOG", status: "backlog"},
        {id: 2, name: "TO-DO", status: "todo"},
        {id: 3, name: "IN PROGRESS", status: "in_progress"},
        {id: 4, name: "REVIEW", status: "review"},
        {id: 5, name: "DONE", status: "closed"}
    ]);

    return (
        <>
        <Navigation sticky={"top"}/>
        <div style={{display: "flex"}}>
            <SidebarMenu project={project} from={"board"}/>
            <div className="boardContainer" >
            { sprint ? ( <>
                <div className="boardHeader">
                    <div className="projectLocation">
                        <Nav.Link href="/projects" className="nav-link">Projects</Nav.Link>
                        <span style={{padding: '0px 8px'}}>/</span>
                        <Nav.Link href={`/board/${projectId}`} className="nav-link">{project.projectName}</Nav.Link>
                    </div>
                    <div className="boardName">
                    {isEditing ? (
                        <h2>
                            <input
                                type="text"
                                value={newBoardName}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                onBlur={handleBlur}
                                autoFocus
                                />
                            </h2>
                                
                            ) : (
                                <h2>
                                    <span onClick={handleEditClick}>
                                        {boardName}
                                    </span>
                                </h2>)}
                    </div>
                    <div className="searchLevel">
                        <div className="searchBar">
                            <input type="text" placeholder="Search..." />
                        </div>
                        <div className="members">
                            <Row>
                                        <UserButtonsContainer 
                                          users={project.users}
                                          getTasksFilteredByAssigneeId={getTasksFilteredByAssigneeId}
                                          getTasks={getTasks}/>

                            </Row>
                        </div>
                    </div>
                </div>
                <div className="innerBoardContainer">
                    {
                        panels.map((panel) => {
                            return <BoardComponent panel={panel} sprint_tasks={tasks}/>
                        })
                    }
                </div>
                </>) : (
                <h1>There's no started sprint yet.</h1>
            )
            }
            </div>

        </div>
        
        </>
    )
}
