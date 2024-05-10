import React, { useState } from 'react';
import "./Sidebar.css";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {Link, useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faClipboardList, faExclamationCircle, faArrowLeft, faArrowRight, faChartSimple } from '@fortawesome/free-solid-svg-icons';

export const SidebarMenu = (props) => {
    const [activeItem, setActiveItem] = useState(props.from);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const sidebarClass = sidebarVisible ? "sidebar open" : "sidebar";

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <>
            <Sidebar fixed={"left"} className={sidebarClass} collapsed={!sidebarVisible}>
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
                    {sidebarVisible ? <div className="menuTitle">Project Name</div>
                    : <div className="menuTitle"><br/></div>}
                            
                    <MenuItem
                        active={activeItem === "backlog"}
                        onClick={() => handleItemClick("backlog")}
                        component={<Link to={`/backlog/${props.project.id}`}/>}
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
                        component={<Link to={`/board/${props.project.id}`}/>}
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
                        component={<Link to={`/issues/${props.project.id}`} />}
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
                        component={<Link to={`/charts/${props.project.id}`} />}
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
            <div className="toggleButton" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={sidebarVisible ? faArrowLeft : faArrowRight} />
            </div>
        </>
    );
};
