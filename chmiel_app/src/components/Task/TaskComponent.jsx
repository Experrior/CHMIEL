import './TaskComponent.css'
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

export const TaskComponent = ({task}) => {
    const navigate = useNavigate();

    return (
        <div key={task.id} className={"taskComponentContainer"} onClick={() => navigate(`/issues/${task.projectId}`, {state:{id:1, task:task}})}>
            <p style={{fontWeight: "bold", fontSize: 20, marginBottom: 6}}>{task.name}</p>
            <div style={{display: "flex", gap: 10, alignItems: "center"}}>
                <FontAwesomeIcon icon={faUser}/>
                {task.assignee ? <p>{task.assignee?.firstName} {task.assignee?.lastName}</p>  : <p>not assigned</p>}
            </div>
            {/* <p>{task.assignee}</p> */}
        </div>
    )
}