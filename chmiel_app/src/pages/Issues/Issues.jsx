import {Container, Nav, Col, Row, Button} from "react-bootstrap";
import {Navigation} from "../../components/Navigation/Navigation";
import {SidebarMenu} from "../../components/Sidebar/Sidebar";
import { IssueComponent } from "../../components/IssuesComponents/IssueComponent";
import "./Issues.css"
import {useEffect, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "../../api/axios";
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";


export const Issues = () => {
    let { projectId } = useParams();
    const [cookies] = useCookies(["token"]);
    const [project, setProject] = useState([]);
    const [tasks, setTasks] = useState([
        {id: 1, name: "testTask1", description: null},
        {id: 2, name: "testTask1", description: "pizda"},
    ]);
    
    const [selectedIssueId, setSelectedIssueId] = useState(1);
    
    const getSelectedTask = () => {
        return tasks.find(task => task.id === selectedIssueId);
    };

    const [issueName, setIssueName] = useState(getSelectedTask().name);
    const [isEditing, setIsEditing] = useState(false);
    const [newIssueName, setNewIssueName] = useState('');

    const handleEditClick = () => {
        setIsEditing(true);
        setNewIssueName(issueName);
    };

    const handleInputChange = (event) => {
        setNewIssueName(event.target.value);
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
        setNewIssueName(newIssueName);
        setIsEditing(false);
    };

    const [newIssueDescription, setNewIssueDescription] = useState(getSelectedTask().description);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    
    const handleEditDescriptionClick = () => {
        setIsEditingDescription(true);
        setNewIssueDescription(newIssueDescription);
    };

    const handleDescriptionChange = (event) => {
        setNewIssueDescription(event.target.value);
    };


    const saveDescriptionChanges = async () => {
        try {
            await modifyDescription(newIssueDescription);
        } catch (error) {
            console.error(error);
        }
        setNewIssueDescription(newIssueDescription);
        setIsEditingDescription(false);
    };

    const modifyDescription = async (description) => {
        await axios.put("/api/task/update",
        {
            name: getSelectedTask().name,
            description: description,
            projectId: projectId,
            reporterId: 22,
            timeEstimate: 2
        },
        {
            headers: {Authorization: cookies.token}
        }).then(result => {
            console.log(result.data)
            // setTasks(tasks.map(task => task.id === selectedIssueId ? response.data : task));
        }).catch(e => {
            console.error(e)
        })
    }

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await axios.get(`/api/project/getProjectByProjectId/${projectId}`);
                console.log(response.data)
                setProject(response.data);
            } catch (error) {
                console.log(error)
            }
        };

        const getTasks = async () => {
            try {
                const response = await axios.get(`/api/task/getTasksByProjectId/${projectId}`,
                {
                    headers: { Authorization: "Bearer " + cookies.token }
                });
                console.log(response.data);
                setTasks(response.data);
            } catch (error) {
                console.log(error);
            }
          };

        getProject();
        getTasks();
    }, [projectId]);

    const handleIssueClick = (taskId) => {
        setSelectedIssueId(taskId);
    };


    return (
        <>
            <Navigation sticky={"top"}/>
            <div style={{display: "flex", minHeight: "calc(100vh - 175px)"}}>
                <SidebarMenu project={project} from={"issues"}/>
                <div className="issuesContainer">
                    <div className="projectLocation">
                        <Nav.Link href="" className="nav-link">Projects</Nav.Link>
                        <span style={{padding: '0px 8px'}}>/</span>
                        <Nav.Link href={`/issues/${projectId}`} className="nav-link">{project.projectName}</Nav.Link>
                    </div>
                    <div className="issuesHeader">
                        <h2>
                            <span>
                                Issues
                            </span>
                        </h2>
                    </div>
                    <div style={{display: "flex", marginBottom: "16px"}}>
                        <div className="searchBar"><input type="text" placeholder="Search issues" /></div>

                    </div>
                    
                    <div className="contentContainer"
                        style={{display: "flex", gap: "16px"}}>
                        <div className="issuesListContainer">
                            { tasks.length !== 0 ? 
                                (
                                    tasks.map((task) => {
                                        return <IssueComponent
                                            key={task.id} 
                                            task={task}
                                            isSelected={selectedIssueId === task.id}
                                            onClick={() => handleIssueClick(task.id)}/>
                                    })
                                ) : <><p>You haven't worked on any anything yet. <a href="#">View all projects.</a></p></>
                            }

                        </div>
                        <div className="issueDetailsContainer">
                        { selectedIssueId && tasks.length !== 0 ? (
                            <>    
                                <div className="issueLocation">
                                    <Nav.Link href={`/issues/${projectId}`} className="nav-link">{project.projectName}</Nav.Link>
                                    <span style={{padding: '0px 8px'}}>/</span>
                                    <Nav.Link href={""} className="nav-link">SPRINT NAME</Nav.Link>
                                </div>
                                <div className="issueDetails">
                                    <div className="issueName">
                                        {isEditing ? (
                                            <p>
                                                <input
                                                    type="text"
                                                    value={newIssueName}
                                                    onChange={handleInputChange}
                                                    onKeyDown={handleKeyDown}
                                                    onBlur={handleBlur}
                                                    autoFocus
                                                    />
                                            </p>
                                                
                                            ) : (
                                                <p>
                                                    <span onClick={handleEditClick}>
                                                        {getSelectedTask().name}
                                                    </span>
                                                </p>
                                            )
                                        }
                                    </div>
                                    <div className="issueDescription">
                                        <p style={{fontWeight: "500"}}>Description</p>
                                        <div>
                                            {isEditingDescription ? (
                                                <>
                                                    <textarea
                                                        rows={5}
                                                        value={newIssueDescription}
                                                        onChange={handleDescriptionChange}
                                                        autoFocus
                                                        className="form-control edit-textarea"
                                                    />
                                                    <Button onClick={saveDescriptionChanges} className="edit-button">
                                                        Save Description
                                                    </Button>
                                                </>
                                            ) : (
                                                <div className="description-preview">
                                                    <p>{getSelectedTask().description}</p>
                                                    <Button onClick={handleEditDescriptionClick} className="edit-button">
                                                        Edit Description
                                                    </Button>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </>
                        ) : (<p>No issue selected</p>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}