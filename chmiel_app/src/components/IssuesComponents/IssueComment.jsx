import React, { useState } from 'react';
import "./IssueComment.css";
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";

export const IssueComment = ({ comment }) => { 

    return (
        <>
        <p>{comment.author}</p>
        <p>{comment.message}</p>
        </>
    )
}