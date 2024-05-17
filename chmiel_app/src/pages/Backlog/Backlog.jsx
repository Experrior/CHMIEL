import {Accordion, Button, Dropdown, Nav} from "react-bootstrap";
import {Navigation} from "../../components/Navigation/Navigation";
import {SidebarMenu} from "../../components/Sidebar/Sidebar";
import './Backlog.css';
import React, {useEffect, useState} from "react";
import axios from "../../api/axios";
import {useParams} from "react-router-dom";
import {CreateIssueModal} from "../../components/Backlog/CreateIssueModal";
import {useCookies} from "react-cookie";
import {DeleteSprintModal} from "../../components/Backlog/DeleteSprintModal";
import {EditSprintModal} from "../../components/Backlog/EditSprintModal";
import {TaskBacklogPageComponent} from "../../components/Backlog/TaskBacklogPageComponent";
import {DeleteAlert} from "../../components/Backlog/DeleteAlert";
import {StartSprintModal} from "../../components/Backlog/StartSprintModal";
import {StartSprintAlert} from "../../components/Backlog/StartSprintAlert";

export const BacklogPage = (props) => {
    let {projectId} = useParams()
    const [cookies] = useCookies(["token"])
    const [project, setProject] = useState([])
    const [sprints, setSprints] = useState([])
    const [tasks, setTasks] = useState([])
    const [isThereAStartedSprint, setIsThereAStartedSprint] = useState(false)

    const formatDate = (dateString) => {
        const options = {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'UTC'
        };
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options);
    }

    const addIssue = async (taskName, taskDescription, timeEstimate, assigneeId) => {
        console.log(assigneeId)
        await axios.post("/api/task/create",
            {
                name: taskName,
                description: taskDescription,
                projectId: projectId,
                timeEstimate: timeEstimate,
                assigneeId: assigneeId
            },
            {
                headers: {Authorization: `Bearer ${cookies.token}`}
            }).then(result => {
            console.log(result.data)
            setTasks([...tasks, result.data])
        }).catch(e => {
            console.error(e)
        })
    }

    const addSprint = async () => {
        await axios.post("/api/sprint/create",
            {
                projectId: projectId,
            },
            {
                headers: {Authorization: `Bearer ${cookies.token}`}
            }).then(result => {
            console.log(result.data)
            setSprints([...sprints, result.data])
        }).catch(e => {
            console.error(e)
        })
    }

    const deleteSprint = async (sprint_id) => {
        await axios.delete(`/api/sprint/delete/${sprint_id}`,
            {
                headers: {Authorization: `Bearer ${cookies.token}`}
            }).then(result => {
            setSprints(sprints => sprints.filter(sprint => sprint.id !== sprint_id))
        }).catch(e => {
            console.error(e)
        })
    }

    const editSprint = async (sprint_id, sprintName, startTime, endTime, isStarted, isFinished) => {
        await axios.patch(`/api/sprint/edit/${sprint_id}`, {
                sprintName: sprintName,
                startTime: startTime,
                stopTime: endTime,
                isStarted: isStarted,
                isFinished: isFinished
            },
            {
                headers: {Authorization: `Bearer ${cookies.token}`}
            }).then(result => {
            setSprints(sprints => sprints.map(sprint =>
                sprint.id === sprint_id ? {...sprint, ...result.data} : sprint
            ))
        }).catch(e => {
            console.error(e)
        })
    }

    const editTaskStatus = async (task, newStatus) => {
        await axios.put(`/api/task/update`,
            {
                id: task.id,
                assigneeId: task.assignee ? task.assignee.id : null,
                sprintId: task.sprint.id,
                name: task.name,
                description: task.description,
                loggedHours: task.loggedHours,
                timeEstimate: task.timeEstimate,
                status: newStatus === "in progress" ? "in_progress" : newStatus,
                inEpic: task.inEpic
            },
            {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            }
        ).then(result => {
            console.log(result.data)
            setTasks(tasks => tasks.map(task2 => task2.id === task.id ? {...task2, ...result.data} : task2))
        }).catch(e => {
            console.error(e)
        })
    }

    const editTaskAssignee = async (task, assigneeId) => {
        console.log("id")
        console.log(assigneeId)
        await axios.put(`/api/task/update`,
            {
                id: task.id,
                assigneeId: assigneeId,
                sprintId: task.sprint.id,
                name: task.name,
                description: task.description,
                loggedHours: task.loggedHours,
                timeEstimate: task.timeEstimate,
                status: task.status,
                inEpic: task.inEpic
            },
            {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            }
        ).then(result => {
            console.log(result.data)
            setTasks(tasks => tasks.map(task2 => task2.id === task.id ? {...task2, ...result.data} : task2))
        }).catch(e => {
            console.error(e)
        })
    }

    const editTaskSprintId = async (task, sprintId) => {
        await axios.put(`/api/task/update`,
            {
                id: task.id,
                assigneeId: task.assigneeId,
                sprintId: sprintId,
                name: task.name,
                description: task.description,
                loggedHours: task.loggedHours,
                timeEstimate: task.timeEstimate,
                status: task.status,
                inEpic: task.inEpic
            },
            {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            }
        ).then(result => {
            console.log(result.data)
            setTasks(tasks => tasks.map(task2 => task2.id === task.id ? {...task2, ...result.data} : task2))
        }).catch(e => {
            console.error(e)
        })
    }

    useEffect(() => {

        const getProject = async () => {
            try {
                const response = await axios.get(`/api/project/getProjectByProjectId/${projectId}`,
                    {
                        headers: {Authorization: `Bearer ${cookies.token}`}
                    }
                )
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
                        headers: {Authorization: `Bearer ${cookies.token}`}
                    }
                )
                console.log(response.data)
                setSprints(response.data);
            } catch (error) {
                console.log(error)
            }
        };

        const getTasks = async () => {
            try {
                const response = await axios.get(`/api/task/getTasksByProjectId/${projectId}`,
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

        getProject()
        getSprints()
        getTasks()

    }, [])

    useEffect(() => {
        setIsThereAStartedSprint(sprints.filter((sprint) => sprint.started === true).length > 0)
    }, [sprints])

    return (
        <>
            <Navigation sticky={"top"}/>
            <div style={{display: "flex"}}>
                <SidebarMenu project={project} from={"backlog"}/>
                <div className={"projectPageContainer"}>
                    <div className="projectLocation">
                        <Nav.Link href="" className="nav-link">Projects</Nav.Link>
                        <span style={{padding: '0px 8px'}}>/</span>
                        <Nav.Link href={`/board/${projectId}`} className="nav-link">{project.projectName}</Nav.Link>
                    </div>
                    <div className="backlogName">
                        <h2>
                            <span>
                                Backlog
                            </span>
                        </h2>

                    </div>
                    <div>
                        <div className={"sprintsContainer"}>
                            {sprints.length !== 0 ? sprints.map((sprint) => (
                                <Accordion key={sprint.id} flush>
                                    <Accordion.Item eventKey="0">
                                        <div className={"accordionHeaderContainer"}>
                                            <Accordion.Header>
                                                <p>{sprint.sprintName}</p>
                                                {sprint.startTime ?
                                                    <p style={{
                                                        marginLeft: 16,
                                                        color: "grey",
                                                        fontSize: 12
                                                    }}>{formatDate(sprint.startTime)} - {formatDate(sprint.stopTime)}</p>
                                                    : <p></p>
                                                }
                                            </Accordion.Header>

                                            {/*{isThereAStartedSprint ? "true" : "false"}*/}

                                            {sprint.started ? <Button variant={"custom-tertiary-v2"}>Stop
                                                Sprint</Button> : (isThereAStartedSprint ?
                                                <Button disabled={true} variant={"custom-tertiary-v2"}>Start
                                                    Sprint</Button> : (tasks.filter((task) => task.sprint?.id === sprint.id).length === 0 ?
                                                    <StartSprintAlert alertText={"Can't start sprint with no tasks."}/>
                                                    : <StartSprintModal sprint={sprint} editSprint={editSprint}/>))}
                                            {/*<StartSprintModal sprint={sprint}/>*/}
                                            {/*<Button disabled={true} variant={"custom-tertiary-v2"}>Start Sprint</Button>*/}

                                            <Dropdown>
                                                <Dropdown.Toggle variant="custom-tertiary-v2" id="dropdown-basic">
                                                    More
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <EditSprintModal sprint={sprint} editSprint={editSprint}/>
                                                    {/*<DeleteSprintModal sprint={sprint} deleteSprint={deleteSprint}/>*/}
                                                    {tasks.filter((task) => task.sprint?.id === sprint.id).length > 0 ?
                                                        <DeleteAlert/>
                                                        :
                                                        <DeleteSprintModal sprint={sprint}
                                                                           deleteSprint={deleteSprint}/>}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <Accordion.Body>
                                            {tasks.length !== 0 ? tasks.filter((task) => task.sprint?.id === sprint.id).map((task) => {
                                                return <TaskBacklogPageComponent task={task}
                                                                                 editTaskStatus={editTaskStatus}
                                                                                 users={project.users}
                                                                                 editTaskAssignee={editTaskAssignee}
                                                                                 sprints={sprints.filter((sprint2) => sprint2.id !== sprint.id)}
                                                                                 editTaskSprintId={editTaskSprintId}/>
                                            }) : <></>}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            )) : <></>}
                        </div>


                        <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0">
                                <div className={"accordionHeaderContainer"}>
                                    <Accordion.Header>
                                        <p>Backlog</p>
                                    </Accordion.Header>
                                    <Button variant={"custom-tertiary-v2"} onClick={() => addSprint()}>Create
                                        Sprint</Button>
                                </div>
                                <Accordion.Body>
                                    {tasks.length !== 0 ? tasks.filter((task) => task.sprint === null).map((task) => {
                                        return <TaskBacklogPageComponent task={task} editTaskStatus={editTaskStatus}
                                                                         users={project.users}
                                                                         editTaskAssignee={editTaskAssignee}
                                                                         sprints={sprints}
                                                                         editTaskSprintId={editTaskSprintId}/>
                                    }) : <></>}
                                    <CreateIssueModal addIssue={addIssue} user={project.users}/>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    )
}