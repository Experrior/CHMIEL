import React from 'react';
import { Button } from 'react-bootstrap';
import "./IssueComment.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from "../../api/axios";
import {useCookies} from "react-cookie";
import {useState} from "react";

export const IssueComment = ({ comment, user }) => { 
    const [cookies] = useCookies(["token"]);

    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(comment.message);

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
    
    const deleteComment = async (commentId) => {
        await axios.delete(`/api/task-comment/delete/${commentId}`,
        {
            headers: {Authorization: `Bearer ${cookies.token}`}
        }).then(result => {
            console.log(result.data)
            // setTaskComments(taskComments.filter(comment => comment.id !== commentId))
        }).catch(e => {
            console.error(e)
        })
    }

    const editComment = async (message) => {
        await axios.put(`/api/task-comment/update/${comment.id}`,
        {
            message: message
        },
        {
            headers: {Authorization: `Bearer ${cookies.token}`}
        }).then(result => {
            console.log("new message:" + message)
            console.log(result.data)
            // setTaskComments(taskComments.map(comment => comment.id === commentId ? result.data : comment))
        }).catch(e => {
            console.error(e)
        })
    }

    return (
        <>
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
                                         onClick={() => { deleteComment(comment.id) }} 
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
                        <div className="editButtons">
                            <Button type="submit">Save</Button>
                            <Button onClick={handleCancelClick}>Cancel</Button>
                        </div>
                    </form> : comment.message
                }
                {/* {comment.message} */}
            </div>
        </div>
       
        </>
    )
}