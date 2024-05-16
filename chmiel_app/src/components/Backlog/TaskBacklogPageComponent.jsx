import "./TaskBacklogPageComponent.css"
import {Button, Dropdown} from "react-bootstrap";
import {EditSprintModal} from "./EditSprintModal";
import {DeleteSprintModal} from "./DeleteSprintModal";
import React from "react";
export const TaskBacklogPageComponent = (props) => {

    return (
        <div className={"taskBacklogContainer"} key={props.task.id}>

            <div className={"taskNameContainer"}>
                <p className={"taskName"}>{props.task.name}</p>
            </div>
            <Dropdown className={"status"}>
                <Dropdown.Toggle variant="custom-tertiary-small-v2" id="dropdown-basic">
                    STATUS
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {/*<EditSprintModal sprint={sprint} editSprint={editSprint}/>*/}
                    {/*<DeleteSprintModal sprint={sprint} deleteSprint={deleteSprint}/>*/}
                </Dropdown.Menu>
            </Dropdown>
            <div className={"taskAssignee"}>
                <p>?</p>
            </div>
            {/*<div className={"menu"}>*/}
            {/*    <p>...</p>*/}
            {/*</div>*/}
            <Dropdown className={"menu"}>
                <Dropdown.Toggle style={{height: 32, width: 32}} variant="custom-tertiary-v2" id="dropdown-basic">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {/*<EditSprintModal sprint={sprint} editSprint={editSprint}/>*/}
                    {/*<DeleteSprintModal sprint={sprint} deleteSprint={deleteSprint}/>*/}
                </Dropdown.Menu>
            </Dropdown>

        </div>
    )
}