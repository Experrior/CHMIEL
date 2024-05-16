import "./TaskBacklogPageComponent.css"
import {Button, Dropdown} from "react-bootstrap";
import {EditSprintModal} from "./EditSprintModal";
import {DeleteSprintModal} from "./DeleteSprintModal";
import React, {useState} from "react";
import axios from "../../api/axios";
import {useCookies} from "react-cookie";

export const TaskBacklogPageComponent = (props) => {
    const statuses = ["backlog", "todo", "in progress", "review", "closed"]
    const [cookies] = useCookies(["token"])


    return (
        <div className={"taskBacklogContainer"} key={props.task.id}>
            <div className={"taskNameContainer"}>
                <p className={"taskName"}>{props.task.name}</p>
            </div>
            <Dropdown className={"status"}>
                <Dropdown.Toggle variant="custom-tertiary-small-v2" id="dropdown-basic">
                    {props.task?.status === "in_progress" ? "IN PROGRESS" : props.task?.status.toUpperCase()}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {statuses.filter((status) => status !== (props.task?.status === "in_progress" ? "in progress" : props.task?.status)).map((status) =>
                        (<Button variant={"custom-tertiary-small"}
                                 onClick={() => props.editTaskStatus(props.task, status)}>{status.toUpperCase()}</Button>)
                    )}
                </Dropdown.Menu>
            </Dropdown>
            {/*{props.task.assignee ? <div className={"taskAssignee nonEmptyAssignee"}><p className={"assigneeLetters"}>WW*/}
            {/*    /!*{props.task.assignee.firstName[0]}{props.task.assignee.lastName[0]}*!/*/}
            {/*</p></div> : <div className={"taskAssignee emptyAssignee"}><p>?</p></div>}*/}
            <Dropdown style={{gridColumn: "assignee"}}>
                <Dropdown.Toggle variant="custom-circle" id="dropdown-basic" className={"noDropdown"}>
                    {props.task.assignee ?
                        <p className={"assigneeLetters"}>{props.task.assignee.firstName[0]}{props.task.assignee.lastName[0]}</p> :
                        <p>?</p>}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {props.task.assignee ?
                        <>
                            <Button onClick={() => props.editTaskAssignee(props.task, null)} variant={"custom-tertiary-small"}>No assignee</Button>
                            {props.users?.filter((user) => user.id !== props.task.assignee.id).map((user) => (
                                <Button onClick={() => props.editTaskAssignee(props.task, user.id)} variant={"custom-tertiary-small"}>{user.firstName} {user.lastName}</Button>
                            ))}
                        </>
                        :
                        <>
                            {props.users?.map((user) => (
                                <Button onClick={() => props.editTaskAssignee(props.task, user.id)} variant={"custom-tertiary-small"}>{user.firstName} {user.lastName}</Button>
                            ))}
                        </>}

                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className={"menu"}>
                <Dropdown.Toggle style={{height: 32, width: 32}} variant="custom-tertiary-v2" id="dropdown-basic">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {props.sprints?.filter((sprint) => sprint.id !== props.task.sprintId).map((sprint) => (
                        <Button onClick={() => props.editTaskSprintId(props.task, sprint.id)} variant={"custom-tertiary-small"}>{sprint.sprintName}</Button>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

        </div>
    )
}