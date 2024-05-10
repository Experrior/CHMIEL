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
import { IssueComment } from "../../components/IssuesComponents/IssueComment";


export const Issues = () => {
    let { projectId } = useParams();
    const [cookies] = useCookies(["token"]);
    const [project, setProject] = useState([]);
    const [tasks, setTasks] = useState([
        {id: 1, name: "testTask1", description: null},
        {id: 2, name: "testTask2", description: "description"},
    ]);
    const [taskComments, setTaskComments] = useState([]);
    
    const [selectedIssueId, setSelectedIssueId] = useState(1);
    
    const getSelectedTask = () => {
        return tasks.find(task => task.id === selectedIssueId);
    };



    const [issueName, setIssueName] = useState(getSelectedTask().name);
    const [isEditing, setIsEditing] = useState(false);
    const [newIssueName, setNewIssueName] = useState('');

    const handleEditClick = () => {
        setIsEditing(true);
        setNewIssueName(getSelectedTask().name);
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

    const saveChanges = async () => {
        try {
            // await editTask(newIssueName, getSelectedTask().description);
            const updatedTasks = tasks.map(task => {
                if (task.id === selectedIssueId) {
                    return { ...task, name: newIssueName };
                }
                return task;
            });
            setTasks(updatedTasks);
        } catch (error) {
            console.error(error);
        }
        setIssueName(newIssueName);
        setIsEditing(false);
    };

    const [issueDescription, setIssueDescription] = useState(getSelectedTask().description);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [newIssueDescription, setNewIssueDescription] = useState('');
    
    const handleEditDescriptionClick = () => {
        setIsEditingDescription(true);
        setNewIssueDescription(getSelectedTask().description);
    };

    const handleDescriptionChange = (event) => {
        setNewIssueDescription(event.target.value);
    };


    const saveDescriptionChanges = async () => {
        try {
            // await editTask(getSelectedTask().name, newIssueDescription);
            const updatedTasks = tasks.map(task => {
                if (task.id === selectedIssueId) {
                    return { ...task, description: newIssueDescription };
                }
                return task;
            });
            setTasks(updatedTasks);
        } catch (error) {
            console.error(error);
        }
        setIsEditingDescription(false);
    };

    const editTask = async (name, description) => {
        await axios.put("/api/task/update",
        {
            id: getSelectedTask().id,
            assigneeId: getSelectedTask().assigneeId,
            sprintId: getSelectedTask().sprintId,
            name: name,
            description: description,
            loggedHours: getSelectedTask().loggedHours,
            timeEstimate: getSelectedTask().timeEstimate,
            status: getSelectedTask().status,
            inEpic: getSelectedTask().inEpic,
        },
        {
            headers: {Authorization: cookies.token}
        }).then(result => {
            console.log(result.data)
            setTasks(tasks.map(task => task.id === selectedIssueId ? result.data : task));
        }).catch(e => {
            console.error(e)
        })
    }

    const addComments = async (task_id, message, author) => {
        await axios.post(`/api/task-comment/create`,
        {
            taskId: task_id,
            message: message,
            authorId: author,
        },
        {
            headers: {Authorization: `Bearer ${cookies.token}`}   
        }).then(result => {
            console.log(result.data)
            setTaskComments([...taskComments, result.data])
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

        const getTaskComments = async () => {
            try  {
                const response = await axios.get(`/api/task-comment/getByTaskId/${selectedIssueId}`,
                    {
                        headers: { Authorization: "Bearer " + cookies.token }
                    });
                    console.log(response.data);
                    setTaskComments(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
         

        getProject();
        getTasks();
        getTaskComments();
    }, []);

    const handleIssueClick = (taskId) => {
        console.log("Selected issue: " + selectedIssueId);
        setSelectedIssueId(taskId);
        console.log("New selected issue: " + taskId);
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
                                        <p style={{fontWeight: "500", paddingLeft: "4px"}}>Description</p>
                                        <div>
                                            {isEditingDescription ? (
                                                <>
                                                    <textarea
                                                        rows={3}
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
                                                    {getSelectedTask().description ? (
                                                    <>
                                                        <p onClick={handleEditDescriptionClick}>{getSelectedTask().description}</p>
                                                    </>
                                                    ) : (
                                                        <p onClick={handleEditDescriptionClick} className="add-description">
                                                            Add a description
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                    <div className="issueComments">
                                        <p style={{fontWeight: "500"}}>Comments</p>
                                        <div>
                                        { taskComments.length !== 0 ? 
                                            (
                                                taskComments.map((comment) => {
                                                    return <IssueComment
                                                        key={comment.id} 
                                                        comment={comment}
                                                       />
                                                })
                                            ) : <><p>No comments yet.</p></>
                                        }
                                            
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