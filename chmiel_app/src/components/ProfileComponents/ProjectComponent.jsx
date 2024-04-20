import './ProjectComponent.css'
export const ProjectComponent = ({project}) => {
    return(
        <div key={project.id} className={"projectComponentContainer"}>
            <h5>{project.name}</h5>
            <div className={"quickLinks"}>
                <h6>QUICK LINKS</h6>
                <div className={"link"}><a href="">My open issues</a></div>
                <div className={"link"}><a href="">Done issues</a></div>
            </div>
        </div>
    )
}