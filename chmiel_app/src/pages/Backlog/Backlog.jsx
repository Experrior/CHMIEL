import {Accordion, Button, Nav} from "react-bootstrap";
import {Navigation} from "../../components/Navigation/Navigation";
import {SidebarMenu} from "../../components/Sidebar/Sidebar";
import './Backlog.css';
import React, {useEffect, useState} from "react";
import axios from "../../api/axios";
import {useLocation, useParams} from "react-router-dom";
import {EditUserDetailsModal} from "../../components/ProfileComponents/EditUserDetailsModal";
import {CreateIssueModal} from "../../components/Backlog/CreateIssueModal";

export const BacklogPage = (props) => {
    let { projectId } = useParams();
    const [project, setProject] = useState([])
    const [sprints, setSprints] = useState([])
    const [tasks, setTasks] = useState([])

    const addIssue = async (taskName, taskDescription) => {
        await axios.post("/api/task/create",
            {
                name: taskName,
                description: taskDescription,
                projectId: projectId,
                reporterId: 3,
                timeEstimate: 2
            }).then(result => {
            console.log(result.data)
            setTasks(result.data)
        }).catch(e => {
            console.error(e)
        })
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
        console.log(projectId)
    }, [])


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
                        <Accordion defaultActiveKey="0" flush>
                            {sprints.length !== 0 ? sprints.map((sprint) => {
                                return <Accordion.Item eventKey="0">
                                    <Accordion.Header>{sprint.sprintName}</Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            task
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            }) : <></>}

                        </Accordion>
                        <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Backlog</Accordion.Header>
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