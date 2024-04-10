import './ProjectComponent.css'
export const ProjectComponent = ({project}) => {
    return(
        <div key={project.id} className={"projectComponentContainer"}>
            <h3>{project.name}</h3>
        </div>
    )
}