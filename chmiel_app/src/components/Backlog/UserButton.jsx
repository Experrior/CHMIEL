import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap"; // Make sure Bootstrap CSS is imported

export const UserButton = ({ user, isActive, onClick }) => {
    return (
        <>
            {
                user ? <Button
                    className={`${!isActive ? 'btn-custom-circle-v2' : 'btn-custom-circle-v2-selected'}`} // Toggle class based on isActive
                    onClick={onClick}
                >
                    <p className={"assigneeLettersLarger"}>{user.firstName[0]}{user.lastName[0]}</p>
                </Button> : <Button
                    className={`${!isActive ? 'btn-custom-circle-v2' : 'btn-custom-circle-v2-selected'}`} // Toggle class based on isActive
                    onClick={onClick}
                >
                    <p>?</p>
                </Button>
            }
        </>
    );
}
