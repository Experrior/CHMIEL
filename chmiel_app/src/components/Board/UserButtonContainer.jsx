import React, {useState} from 'react';
import {UserButton} from './UserButton'; // Import UserButton component

export const UserButtonsContainer = (props) => {
    const [activeUserId, setActiveUserId] = useState(null);

    const handleButtonClick = (userId) => {
        if (userId === activeUserId) {
            setActiveUserId(null);
            props.getTasks();
        } else {
            setActiveUserId(userId);
            props.getTasksFilteredByAssigneeId(userId);
        }
    };

    return (
        <div className={"backlogUserFilterContainer"}>
            {props.users?.map(user => (
                <UserButton
                    key={user.id}
                    user={user}
                    isActive={user.id === activeUserId}
                    onClick={() => handleButtonClick(user.id)}
                />
            ))}
            <UserButton
                key="none"
                user={null}
                isActive={activeUserId === -1}
                onClick={() => handleButtonClick(-1)}
            />
        </div>
    );
};