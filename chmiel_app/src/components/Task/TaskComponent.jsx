import './TaskComponent.css'
export const TaskComponent = ({task}) => {
    return(
        <div key={task.id} className={"taskComponentContainer"}>
            <p>{task.name}</p>
            {/* <p>{task.assignee}</p> */}
        </div>
    )
}