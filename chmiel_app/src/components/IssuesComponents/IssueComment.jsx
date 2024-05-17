import React from 'react';
import "./IssueComment.css";

export const IssueComment = ({ comment }) => { 

    return (
        <>
        <div className="commentBody">
            <div className="author">
                <span> {comment.author?.firstName} {comment.author?.lastName} </span>
            </div>
            <div className="message">
                {comment.message}
            </div>
        </div>
       
        </>
    )
}