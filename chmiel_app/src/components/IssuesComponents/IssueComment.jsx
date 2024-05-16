import React, { useState } from 'react';
import "./IssueComment.css";
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";

export const IssueComment = ({ comment }) => { 

    return (
        <>
        <div className="commentBody">
            <div className="author">
                <span> {comment.author} </span>
            </div>
            <div className="message">
                {comment.message}
            </div>
        </div>
       
        </>
    )
}