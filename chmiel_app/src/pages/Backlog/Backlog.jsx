import {Accordion, Button} from "react-bootstrap";
import {Navigation} from "../../components/Navigation/Navigation";
import {SidebarMenu} from "../../components/Sidebar/Sidebar";
import './Backlog.css';
import React, {useEffect, useState} from "react";
import axios from "../../api/axios";
import {useLocation} from "react-router-dom";
import {EditUserDetailsModal} from "../../components/ProfileComponents/EditUserDetailsModal";
import {CreateIssueModal} from "../../components/Backlog/CreateIssueModal";

export const BacklogPage = (props) => {
    const location = useLocation()
    const [sprints, setSprints] = useState([])
    const [tasks, setTasks] = useState([])

    const addIssue = async (taskName, taskDescription) => {
        await axios.post("/api/task/create",
            {
                name: taskName,
                description: taskDescription,
                projectId: location.state.project.id,
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
        const getSprints = async () => {
            try {
                const response = await axios.get(`/api/sprint/getByProjectId/${location.state.project.id}`)
                console.log(response.data)
                setSprints(response.data);
            } catch (error) {
                console.log(error)

                // setError(error.message);
                // setLoading(false);
            }
        };

        getSprints()
    }, [])


    return (
        <>
            <Navigation sticky={"top"}/>
            <div style={{display: "flex"}}>
                <SidebarMenu/>
                <div className={"projectPageContainer"}>
                    <p>Projects/{location.state.project.name}</p>
                    <h2>Backlog</h2>
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