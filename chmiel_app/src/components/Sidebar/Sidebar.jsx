import React, {useEffect, useState} from 'react';
import "./Sidebar.css";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {Link, useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faClipboardList, faExclamationCircle, faArrowLeft, faArrowRight, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import axios from "../../api/axios";
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";

export const SidebarMenu = (props) => {
    let {projectId} = useParams()
    const [activeItem, setActiveItem] = useState(props.from);
    const [project, setProject] = useState({});
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const sidebarClass = sidebarVisible ? "sidebar open" : "sidebar";
    const [cookies] = useCookies(["token"]);

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    useEffect(() => {
        console.log("sidebar menu")
        console.log(projectId);
        console.log(project);

        const getProject = async () => {
            try {
                const response = await axios.get(`/api/project/getProjectByProjectId/${projectId}`,
                    {
                        headers: { Authorization: `Bearer ${cookies.token}` }
                    }
                )
                console.log(response.data)
                setProject(response.data)
            } catch (error) {
                console.log(error)
            }
        };
        
        getProject()
    }, []);

    return (
        // TODO: make items of the sidebar fixed with remaining collapsable
        <>
            <Sidebar className={sidebarClass} collapsed={!sidebarVisible} >
                <Menu 
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
                </Menu>
                
            </Sidebar>
            <div className="toggleButton" onClick={toggleSidebar} style={{position: "fixed"}}>
                <FontAwesomeIcon icon={sidebarVisible ? faArrowLeft : faArrowRight} />
            </div>
        </>
    );
};
