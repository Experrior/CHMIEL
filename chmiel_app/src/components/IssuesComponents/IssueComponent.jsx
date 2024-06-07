import React, { useState } from 'react';
import "./IssueComponent.css";
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";


export const IssueComponent = ({ task, isSelected, onClick }) => {
    let { projectId } = useParams();
    const [cookies] = useCookies(["token"]);

    return (
        <>
        <div 
            className={`issueComponentContainer ${isSelected ? "selected" : ""}`}
            onClick={onClick}>
            <div className="task">{task.name}</div>
            <div className="sprint">{task.sprint ? task.sprint.sprintName : "No Sprint"}</div>
            {/* <p>{task.sprint.sprintName}</p> */}
            {/* <p>{task.assignee}</p> */}
        </div>
        </>
    )
}