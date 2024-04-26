import './ProjectComponent.css'
import {useNavigate} from "react-router-dom";
import React from "react";

export const ProjectComponent = ({project}) => {
    const navigate = useNavigate();
    return (
        <div key={project.id} className={"projectComponentContainer"}>
            <h5 onClick={() => navigate("backlog", {state: {project: project}})}>{project.name}</h5>
            <div className={"quickLinks"}>
                <h6>QUICK LINKS</h6>
                <div className={"link"}><a href="">My open issues</a></div>
                <div className={"link"}><a href="">Done issues</a></div>
            </div>
        </div>
    )
}