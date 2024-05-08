import {Accordion, Button, Nav} from "react-bootstrap";
import {Navigation} from "../../components/Navigation/Navigation";
import {SidebarMenu} from "../../components/Sidebar/Sidebar";
import './Backlog.css';
import React, {useEffect, useRef, useState} from "react";
import axios from "../../api/axios";
import {useParams} from "react-router-dom";
import {CreateIssueModal} from "../../components/Backlog/CreateIssueModal";
import {useCookies} from "react-cookie";

export const BacklogPage = (props) => {
    let {projectId} = useParams()
    const [cookies] = useCookies(["token"])
    const [project, setProject] = useState([])
    const [sprints, setSprints] = useState([])
    const [tasks, setTasks] = useState([])
    const [openDropdownId, setOpenDropdownId] = useState(null)
    const containerRef = useRef(null);
    const buttonRef = useRef(null);
    const [justToggled, setJustToggled] = useState(false);

    const addIssue = async (taskName, taskDescription) => {
        await axios.post("/api/task/create",
            {
                name: taskName,
                description: taskDescription,
                projectId: projectId,
                reporterId: 3,
                timeEstimate: 2
            },
            {
                headers: {Authorization: cookies.token}
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
                headers: {Authorization: cookies.token}
            }).then(result => {
            console.log(result.data)
            setSprints([...sprints, result.data])
        }).catch(e => {
            console.error(e)
        })
    }

    const toggleDropdown = (event, sprintId) => {
        console.log(sprintId)
        console.log(openDropdownId)
        if (openDropdownId === sprintId) {
            console.log("toggleDropdown - closing")
            setOpenDropdownId(null);
        } else {
            console.log("toggleDropdown - opening")
            setOpenDropdownId(sprintId);
        }
        console.log("toggleDropdown - flag true")
        setJustToggled(true);
    }


    useEffect(() => {

        const getProject = async () => {
            try {
                const response = await axios.get(`/api/project/getProjectByProjectId/${projectId}`)
                console.log(response.data)
                setProject(response.data);
            } catch (error) {
                console.log(error)
            }
        };
        const getSprints = async () => {
            try {
                const response = await axios.get(`/api/sprint/getByProjectId/${projectId}`)
                console.log(response.data)
                setSprints(response.data);
            } catch (error) {
                console.log(error)
            }
        };

        const getTasks = async () => {
            try {
                const response = await axios.get(`/api/task/getTasksByProjectId/${projectId}`)
                console.log(response.data)
                setTasks(response.data);
            } catch (error) {
                console.log(error)
            }
        };

        getSprints()
        getTasks()
        getProject()
    }, [])

    useEffect(() => {
        function handleClickOutside(event) {
            console.log(justToggled)
            if (justToggled && buttonRef.current && buttonRef.current.contains(event.target)) {
                console.log("handleOnClick - just toggled");
                setJustToggled(false); // Reset the flag
            } else if (containerRef.current && !containerRef.current.contains(event.target)) {
                console.log("handleOnClick - set null");
                setOpenDropdownId(null);
            }
        }

        // Attach the listener to the document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the listener on unmount or when dependencies change
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [justToggled, containerRef]); // Include dependencies that affect the effect

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
                            {sprints.length !== 0 ? sprints.map((sprint) => {
                                return <Accordion flush>
                                    <Accordion.Item eventKey="0">
                                        <div className={"accordionHeaderContainer"}>
                                            <Accordion.Header>
                                                <p>{sprint.sprintName}</p>
                                            </Accordion.Header>
                                            <Button variant={"custom-tertiary-v2"}>Start Sprint</Button>
                                            <Button ref={buttonRef} variant={"custom-tertiary-v2"}
                                                    onClick={(e) => toggleDropdown(e, sprint.id)}>...</Button>
                                            {openDropdownId === sprint.id && (
                                                <div ref={containerRef} className={"dropdown"}>
                                                    <Button variant={"custom-tertiary-v3"}>Edit Sprint</Button>
                                                    <Button variant={"custom-tertiary-v3"}>Delete Sprint</Button>
                                                </div>
                                            )}
                                        </div>
                                        <Accordion.Body>
                                            <div>
                                                task test
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            }) : <></>}
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
                                    {tasks.length !== 0 ? tasks.map((task) => {
                                        return <div>{task.name}</div>
                                    }) : <></>}
                                    <CreateIssueModal addIssue={addIssue}/>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    )
}