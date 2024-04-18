import './ProjectComponent.css'
export const ProjectComponent = ({project}) => {
    return(
        <div key={project.id} className={"projectComponentContainer"}>
            <h4>{project.name}</h4>
            <div className={"quickLinks"}>
                <h4>QUICK LINKS</h4>
                <div className={"link"}><a href="">My open issues</a></div>
                <div className={"link"}><a href="">Done issues</a></div>
            </div>
        </div>
    )
}