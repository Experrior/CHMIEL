import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap"; // Make sure Bootstrap CSS is imported

export const UserButton = (props) => {
    const [isActive, setIsActive] = useState(false); // State to track if the button is "active"

    const handleClick = () => {
        setIsActive(!isActive); // Toggle the active state
    };

    return (
        <>
            {
                props.user ? <Button
                    className={`${!isActive ? 'btn-custom-circle-v2' : 'btn-custom-circle-v2-selected'}`} // Toggle class based on isActive
                    onClick={handleClick}
                >
                    <p className={"assigneeLettersLarger"}>{props.user.firstName[0]}{props.user.lastName[0]}</p>
                </Button> : <Button
                    className={`${!isActive ? 'btn-custom-circle-v2' : 'btn-custom-circle-v2-selected'}`} // Toggle class based on isActive
                    onClick={handleClick}
                >
                    <p>?</p>
                </Button>
            }
        </>

        // <Button
        //     className={`${!isActive ? 'btn-custom-circle-v2' : 'btn-custom-circle-v2-selected'}`} // Toggle class based on isActive
        //     onClick={handleClick}
        // >
        //     <p className={"assigneeLettersLarger"}>{props.user.firstName[0]}{props.user.lastName[0]}</p>
        // </Button>
    );
}
