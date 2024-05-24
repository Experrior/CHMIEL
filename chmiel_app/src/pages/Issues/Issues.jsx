import {Container, Nav, Button, Dropdown} from "react-bootstrap";
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
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Linkify from 'react-linkify';
// TOOD
// add an edit button for descritpion and name
// add filtering by status, assignee, sprint
// add status edition

export const Issues = () => {
    let { projectId } = useParams();
    const [cookies] = useCookies(["token"]);

    // setters
    const [user, setUser] = useState({});
    const [project, setProject] = useState([]);
    const [sprints, setSprints] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [taskComments, setTaskComments] = useState([]);

    // sorting attributes
    const [statusFilter, setStatusFilter] = useState('Status');
    const [assigneeFilter, setAssigneeFilter] = useState('');
    const [sprintFilter, setSprintFilter] = useState('');



    // helper
    const statuses = ["backlog", "todo", "in_progress", "review", "closed"]
    const [selectedIssueId, setSelectedIssueId] = useState(null);    
    const getSelectedTask = () => {
        return tasks.find(task => task.id === selectedIssueId);
    };

    const [isAdding, setIsAdding] = useState(false);
    const [newComment, setNewComment] = useState('');

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        addComment(newComment);
        setNewComment('');
        setIsAdding(false);
    };
    const cancelComment = () => {
        setNewComment('');
        setIsAdding(false);
    };


    // SETTING ISSUE NAME
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
            saveNameChanges();
        }
    };
    const handleBlur = () => {
        saveNameChanges();
    };

    const saveNameChanges = async () => {
        try {
            await editTask(newIssueName, getSelectedTask().description, getSelectedTask().status);
        } catch (error) {
            console.error(error);
        }
        setIsEditing(false);
    };

    // SETTING DESCRIPTION
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [newIssueDescription, setNewIssueDescription] = useState('');
    
    const handleEditDescriptionClick = () => {
        setIsEditingDescription(true);
        setNewIssueDescription(getSelectedTask().description);
    };

    const handleDescriptionChange = (event) => {
        setNewIssueDescription(event.target.value);
    };

    const cancelChanges = () => {
        setIsEditingDescription(false);
    }

    const saveDescriptionChanges = async () => {
        try {
            await editTask(getSelectedTask().name, newIssueDescription, getSelectedTask().status);
        } catch (error) {
            console.error(error);
        }
        setIsEditingDescription(false);
    };

    // SETTING STATUS
    const handleStatusChange = async (status) => {
        editTask(getSelectedTask().name, getSelectedTask().description, status);
    }

    // API CALL TO EDIT TASK
    const editTask = async (name, description, status) => {
        await axios.put("/api/task/update",
        {
            id: getSelectedTask().id,
            assigneeId: getSelectedTask().assigneeId,
            sprintId: getSelectedTask().sprintId,
            name: name,
            description: description,
            loggedHours: getSelectedTask().loggedHours,
            timeEstimate: getSelectedTask().timeEstimate,
            status: status,
            inEpic: getSelectedTask().inEpic,
        },
        {
            headers: {Authorization:  `Bearer ${cookies.token}`}
        }).then(result => {
            console.log(result.data)
            setTasks(tasks.map(task => task.id === selectedIssueId ? result.data : task));
        }).catch(e => {
            console.error(e)
        })
    }

    // API CALL ADD COMMENT
    const addComment = async (message) => {
        await axios.post(`/api/task-comment/create`,
        {
            taskId: selectedIssueId,
            message: message,
            authorId: user.id,
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

    const updateTaskComments = (commentId, updatedComment) => {
        setTaskComments(taskComments.map(comment => comment.id === commentId ? updatedComment : comment))
    };

    const deleteTaskComment = async (commentId) => {
        setTaskComments(taskComments.filter(comment => comment.id !== commentId))
    };

    useEffect(() => {

        const getUser = async () => {
            try {
                const response = await axios.get("/api/user",
                    { headers: { Authorization: "Bearer " + cookies.token } }
                );
                console.log("Current user: ");
                console.log(response.data);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getProject = async () => {
            try {
                const response = await axios.get(`/api/project/getProjectByProjectId/${projectId}`,
                    {
                        headers: { Authorization: "Bearer " + cookies.token }
                    }
                );
                console.log("Current project: ");
                console.log(response.data)
                setProject(response.data);
            } catch (error) {
                console.log(error)
            }
        };

        const getSprints = async () => {
            try {
                const response = await axios.get(`/api/sprint/getByProjectId/${projectId}`,
                    {
                        headers: { Authorization: `Bearer ${cookies.token}` }
                    }
                )
                console.log("Sprints: ");
                console.log(response.data)
                setSprints(response.data);
            } catch (error) {
                console.log(error)
            }
        };

        const getTasks = async () => {
            // TODO: change it so it retrieves tasks from each sprint
            try {
                const response = await axios.get(`/api/task/getTasksByProjectId/${projectId}`,
                {
                    headers: { Authorization: "Bearer " + cookies.token }
                });
                console.log("Tasks: ");
                console.log(response.data);
                setTasks(response.data);
                setSelectedIssueId(response.data[0].id);
                getTaskComments(response.data[0].id);
            } catch (error) {
                console.log(error);
            }
          };
        
        getUser();
        getProject();
        getSprints();
        getTasks();
    }, []);

    const getTaskComments = async (taskId) => {
        try  {
            const response = await axios.get(`/api/task-comment/getByTaskId/${taskId}`,
                {
                    headers: { Authorization: "Bearer " + cookies.token }
                });
                console.log(response.data);
                setTaskComments(response.data);
        } catch (error) {
                console.log(error);
        }

    };

    const handleIssueClick = (taskId) => {
        console.log("Selected issue: " + selectedIssueId);
        setSelectedIssueId(taskId);
        getTaskComments(taskId);
        console.log("New selected issue: " + taskId);
    };




    return (
        <>
            <Navigation sticky={"top"}/>
            <div style={{display: "flex", minHeight: "calc(100vh - 75px)"}}>
                <SidebarMenu from={"issues"}/>
                <div className="issuesContainer">
                    <div className="projectLocation">
                        <Nav.Link href="" className="nav-link">Projects</Nav.Link>
                        <span style={{padding: '0px 8px'}}>/</span>
                        <Nav.Link href={`/issues/${projectId}`} className="nav-link">{project.projectName}</Nav.Link>
                    </div>
                    {/* <Container fluid={"md"}> */}
                    
                    <div className="issuesHeader">
                        <h2>
                            <span>
                                Issues
                            </span>
                        </h2>
                    </div>
                    <div style={{display: "flex",
                                flexDirection:'row',
                                marginBottom: "16px",
                                marginRight: "16px",
                                justifyContent: 'space-between',
                                alignItems: 'center'}}>
                        <div className="searchBar"><input type="text" placeholder="Search issues" /></div>
                        <div style={{display: "flex",
                                flexDirection:'row',
                                gap: '16px',
                                alignItems: 'center'}}>
                            <span>Filter by:</span>
                            <DropdownButton id="dropdown-filter" title={statusFilter}>
                                <Dropdown.Item onClick={() => setStatusFilter('Status')}>All</Dropdown.Item>
                                <Dropdown.Item onClick={() => setStatusFilter('backlog')}>Backlog</Dropdown.Item>
                                <Dropdown.Item onClick={() => setStatusFilter('todo')}>To Do</Dropdown.Item>
                                <Dropdown.Item onClick={() => setStatusFilter('in_progress')}>In Progress</Dropdown.Item>
                                <Dropdown.Item onClick={() => setStatusFilter('review')}>Review</Dropdown.Item>
                                <Dropdown.Item onClick={() => setStatusFilter('closed')}>Closed</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton id="dropdown-filter" title="Assignee"></DropdownButton>
                            <DropdownButton id="dropdown-filter" title="Sprint"></DropdownButton>
                        </div>
                    </div>
                    
                    <div className="contentContainer">
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
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                                        
                                            <div className="issueName">
                                                {isEditing ? (
                                                        <input
                                                            type="text"
                                                            value={newIssueName}
                                                            onChange={handleInputChange}
                                                            onKeyDown={handleKeyDown}
                                                            onBlur={handleBlur}
                                                            autoFocus
                                                            />
                                                    ) : (
                                                        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '4px'}}>
                                                            <span onClick={handleEditClick}>
                                                                {getSelectedTask().name}
                                                            </span>
                                                            <FontAwesomeIcon 
                                                                icon={faEdit} 
                                                                style={{ marginLeft: "8px", cursor: "pointer", height: '16px' }} 
                                                                onClick={handleEditClick} 
                                                            />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            
                                        
                                        
                                        <div>
                                        <Dropdown className={"status"}>
                                            <Dropdown.Toggle variant="custom-tertiary-small-v2" id="dropdown-basic">
                                                {getSelectedTask().status === "in_progress" ? "IN PROGRESS" : getSelectedTask().status.toUpperCase()}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {statuses.map((status) =>
                                                    (<Dropdown.Item
                                                        as={Button}
                                                        variant={"custom-tertiary-small"}
                                                        onClick={() => handleStatusChange(status)}>
                                                            {
                                                                status === "in_progress" ? "IN PROGRESS" : status.toUpperCase()
                                                            }
                                                    </Dropdown.Item>)
                                                )}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        </div>
                                    </div>

                                    <div className="issueDescription">
                                        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '4px'}}>
                                        <span style={{fontWeight: "500", paddingLeft: "4px"}}>Description</span>
                                        {
                                            isEditingDescription ? (
                                                <></>
                                            ) : (
                                                <FontAwesomeIcon 
                                                icon={faEdit} 
                                                style={{ marginLeft: "8px", cursor: "pointer" }}
                                                onClick={handleEditDescriptionClick} 
                                            />
                                            )
                                        }
                                        
                                        </div>
                                        
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
                                                    <div
                                                        style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                gap: '4px'
                                                            }}>
                                                        <Button onClick={saveDescriptionChanges} className="btn btn-primary">
                                                            Save
                                                        </Button>
                                                        <Button onClick={cancelChanges} className="btn btn-light">
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                    
                                                </>
                                            ) : (
                                                <div className="description-preview">
                                                    {getSelectedTask().description ? (
                                                    <>
                                                    <Linkify>
                                                        <p onClick={handleEditDescriptionClick}>

                                                            {getSelectedTask().description}
                                                        </p>
                                                        </Linkify>
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

                                    <div className="issueCommentsContainer">
                                        <p style={{fontWeight: "500"}}>Comments</p>
                                        <div className="issueComments">
                                            { taskComments.length !== 0 ? 
                                                (
                                                    taskComments.map((comment) => {
                                                        return <IssueComment
                                                            key={comment.id} 
                                                            comment={comment}
                                                            user={user.id === comment.author.id ? user : null}
                                                            updateTaskComment={updateTaskComments}
                                                            deleteTaskComment={deleteTaskComment}
                                                        />
                                                    })
                                                ) : <><p>No comments yet.</p></>
                                            }
                                        </div>
                                        <div className="createComment">
                                            <span className="btn-custom-circle">
                                                <p className="userLetters">
                                                    {user.firstName[0]}{user.lastName[0]}
                                                </p>
                                            </span>
                                            {isAdding ? (
                                                <>
                                                    <form onSubmit={handleCommentSubmit} style={{ width: '100%', resize: 'vertical' }}>
                                                        <textarea
                                                            rows={3}
                                                            value={newComment}
                                                            onChange={handleCommentChange}
                                                            autoFocus
                                                            className="form-control"
                                                            placeholder="Start typing..."
                                                        />
                                                        <div style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                        gap: '4px'
                                                                    }}>
                                                            <Button type="submit" className="btn btn-primary">
                                                                Add Comment
                                                            </Button>
                                                            <Button onClick={cancelComment} className="btn btn-light">
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </> ) : (
                                                    <div onClick={handleAddClick} className="add-comment" style={{ width: '100%', resize: 'vertical' }}>
                                                        <p>Add a comment...</p>
                                                    </div>
                                                )
                                        }
                                            
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (<p>No issue selected</p>)}
                        </div>
                    </div>
                    {/* </Container> */}
                </div>
            </div>
        </>
    )
}