export const ProjectComponent = ({project}) => {
    return(
        <div key={project.id} style={{background: "white", height: 300}}>
            <h3>{project.name}</h3>
        </div>
    )
}