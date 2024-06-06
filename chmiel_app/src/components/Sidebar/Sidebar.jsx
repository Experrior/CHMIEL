import React, {useEffect, useState} from 'react';
import "./Sidebar.css";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {Link, useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faClipboardList, faExclamationCircle, faArrowLeft, faArrowRight, faChartSimple, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from "../../api/axios";
import {useCookies} from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import { EditProjectModal } from "../../components/Projects/EditProjectModal";
import { DeleteProjectModal } from "../../components/Projects/DeleteProjectModal";

export const SidebarMenu = (props) => {
    let {projectId} = useParams()
    const [activeItem, setActiveItem] = useState(props.from);
    const [project, setProject] = useState({});
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const sidebarClass = sidebarVisible ? "sidebar open" : "sidebar";
    const [cookies] = useCookies(["token"]);
    const navigate = useNavigate();

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const editProjectName = async (name) => {
        await axios.put(`/api/project/editName`, {
            id: projectId,
            name: name
        }, {
            headers: { Authorization: `Bearer ${cookies.token}` }
        }).then(response => {
            console.log(response)
            setProject({...project, projectName: response.data.projectName})
        }).catch(error => {
            console.log(error)
        })
    };

    const addUsersToProject = async (userId) => {
        await axios.post(`/api/project/addUser`, {
            projectID: projectId,
            userId: userId
        }, {
            headers: { Authorization: `Bearer ${cookies.token}` }
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    };

    const removeProject = async () => {
        await axios.delete(`/api/project/remove/${projectId}`, {
            headers: { Authorization: `Bearer ${cookies.token}` }
        }).then(response => {
            console.log(response)
            if (response.status === 200) navigate(`/`);
        }).catch(error => {
            console.log(error)
        })
    };
        
    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await axios.get(`/api/project/getProjectByProjectId/${projectId}`,
                    {
                        headers: { Authorization: `Bearer ${cookies.token}` }
                    }
                )
                setProject(response.data)
            } catch (error) {
                console.log(error)
            }
        };
        
        getProject()
    }, [projectId]);

    return (
        <>
            <Sidebar className={sidebarClass} collapsed={!sidebarVisible} >
                <Menu 
                    style={{position: sidebarVisible ? "fixed" : "relative"}}
                    menuItemStyles={{ button: ({ active }) => {
                        return {
                            backgroundColor: active ? '#def0ff' : undefined,
                            borderColor: active ? '#87caff' : 'transparent',
                            borderRadius: '4px',
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            margin: 'auto 16px',
                            '&:hover': {
                                backgroundColor: '#def0ff',
                            },
                            width: sidebarVisible ? '100%' : '0%',
                            transition: 'width 0.3s ease',
                        };
                    },
                    }}      
                    
                >
                    {sidebarVisible ? <div className="menuTitle">{project.projectName}</div>
                    : <div className="menuTitle"><br/></div>}
                            
                    <MenuItem
                        active={activeItem === "backlog"}
                        onClick={() => handleItemClick("backlog")}
                        component={<Link to={`/backlog/${project.id}`}/>}
                    >
                        <div className="menuItemContent">
                            <div className={"icon"}>
                                <FontAwesomeIcon icon={faTasks}/>
                            </div>
                            <div className="text">Backlog</div>
                        </div>
                    </MenuItem>
                    <MenuItem
                        active={activeItem === "board"}
                        onClick={() => handleItemClick("board")}
                        component={<Link to={`/board/${project.id}`}/>}
                    >
                        <div className="menuItemContent">
                            <div className={"icon"}>
                                <FontAwesomeIcon icon={faClipboardList}/>
                            </div>
                            <div className="text">Board</div>
                        </div>
                    </MenuItem>
                    <MenuItem
                        active={activeItem === "issues"}
                        onClick={() => handleItemClick("issues")}
                        component={<Link to={`/issues/${project.id}`} />}
                    >
                        <div className="menuItemContent">
                            <div className={"icon"}>
                                <FontAwesomeIcon icon={faExclamationCircle}/>
                            </div>
                            <div className="text">Issues</div>
                        </div>
                    </MenuItem>
                    <MenuItem
                        active={activeItem === "charts"}
                        onClick={() => handleItemClick("charts")}
                        component={<Link to={`/charts/${project.id}`} />}
                    >
                        <div className="menuItemContent">
                            <div className={"icon"}>
                                <FontAwesomeIcon icon={faChartSimple}/>
                            </div>
                            <div className="text">Charts</div>
                        </div>
                    </MenuItem>
                    <EditProjectModal editProjectName={editProjectName}/>
                    <DeleteProjectModal deleteProject={removeProject}/>
                </Menu>
                
            </Sidebar>
            <div className="toggleButton" onClick={toggleSidebar} style={{position: "fixed"}}>
                <FontAwesomeIcon icon={sidebarVisible ? faArrowLeft : faArrowRight} />
            </div>
        </>
    );
};
