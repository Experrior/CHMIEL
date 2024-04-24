import React, { useState } from 'react';
import "./Sidebar.css";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faClipboardList, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export const SidebarMenu = () => {
    const [activeItem, setActiveItem] = useState("board");

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <Sidebar id={"sidebar-left"} fixed={"left"}>
            <Menu
                 menuItemStyles={{
                    button: ({ active }) => {
                        return {
                          backgroundColor: active ? '#def0ff' : undefined,
                          borderColor: active ? '#87caff' : 'transparent',
                          borderRadius: '4px',
                          borderWidth: '2px',
                          borderStyle: 'solid',
                          margin: 'auto 8px',
                          '&:hover': {
                            backgroundColor: '#def0ff',
                          },
                        };
                    },
                  }}
                  >
                <div className="menuTitle">Project Name</div>
                <MenuItem
                    active={activeItem === "backlog"}
                    onClick={() => handleItemClick("backlog")}
                    component={<Link to="/board" />}
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
                    component={<Link to="/board" />}
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
                    component={<Link to="/board" />}
                >
                    <div className="menuItemContent">
                        <div className={"icon"}>
                            <FontAwesomeIcon icon={faExclamationCircle}/>
                        </div>
                        <div className="text">Issues</div>
                    </div>
                </MenuItem>
            </Menu>
        </Sidebar>
    );
};
