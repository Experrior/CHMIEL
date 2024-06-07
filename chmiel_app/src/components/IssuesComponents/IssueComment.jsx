import React from 'react';
import { Button } from 'react-bootstrap';
import "./IssueComment.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from "../../api/axios";
import {useCookies} from "react-cookie";
import {useState} from "react";
import {ConfirmationModal} from "./ConfirmationModal";

export const IssueComment = ({ comment, user, updateTaskComment, deleteTaskComment }) => { 
    const [cookies] = useCookies(["token"]);

    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(comment.message);

    const [showConfirmation, setShowConfirmation] = useState(false);

    // deletion
    const handleDeleteClick = () => {
        setShowConfirmation(true);
    }

    const handleConfirmDelete = () => {
        deleteComment(comment.id);
    }

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    }

    // editing
    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleCommentChange = (e) => {
        setEditedMessage(e.target.value);
    }

    const handleSaveClick = (e) => {
        e.preventDefault();
        editComment(editedMessage);
        setIsEditing(false);
    }

    const handleCancelClick = () => {
        setEditedMessage(comment.message);
        setIsEditing(false);
    }

    // API CALLS
    const deleteComment = async (commentId) => {
        await axios.delete(`/api/task-comment/delete/${commentId}`,
        {
            headers: {Authorization: `Bearer ${cookies.token}`}
        }).then(result => {
            console.log(result.data)
            deleteTaskComment(commentId)
        }).catch(e => {
            console.error(e)
        }).finally(() => {
            setShowConfirmation(false);
        })
    }

    const editComment = async (message) => {

        console.log(message)
        const result = await axios.put(
            `/api/task-comment/update/${comment.id}`, // Endpoint URL
            message, // Message sent as plain text
            {
                headers: {
                    'Authorization': `Bearer ${cookies.token}`, // Authorization header with token
                    'Content-Type': 'text/plain' // Set content type to plain text
                }
            }
        );
        try {
            console.log("new message:" + message)
            console.log(result.data.message)
            updateTaskComment(comment.id, result.data)
        } catch(e) {
            console.error(e)
        }
    }

    return (
        <>
        {showConfirmation && (
                <ConfirmationModal
                    message="Are you sure you want to delete this comment?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        <div className="commentBody">
            <div className="author">
                <span> {comment.author?.firstName} {comment.author?.lastName} </span>
                {
                    user ? 
                    <div style={{gap: '8px'}}>
                        <FontAwesomeIcon icon={faEdit} 
                                         className='mod' 
                                         onClick={() => { handleEditClick() }} 
                        />
                         <FontAwesomeIcon icon={faTrash} 
                                         className='mod' 
                                         onClick={() => { handleDeleteClick() }} 
                        />
                    </div> : null
                }
            </div>
            <div className="message">
                {
                    isEditing ? 
                    <form onSubmit={handleSaveClick}>
                        <textarea
                            value={editedMessage}
                            onChange={handleCommentChange}
                            autoFocus
                            className="form-control" />
                        <div className="editButtons" style={{display: "flex", gap: 20, padding: 20}}>
                            <Button variant={"success"} type="submit">Save</Button>
                            <Button variant={"danger"} onClick={handleCancelClick}>Cancel</Button>
                        </div>
                    </form> : comment.message
                }
                {/* {comment.message} */}
            </div>
        </div>
       
        </>
    )
}