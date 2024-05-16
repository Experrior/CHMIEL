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
            <div className={"taskAssignee"}>
                <p>?</p>
            </div>
            <Dropdown className={"menu"}>
                <Dropdown.Toggle style={{height: 32, width: 32}} variant="custom-tertiary-v2" id="dropdown-basic">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                </Dropdown.Menu>
            </Dropdown>

        </div>
    )
}