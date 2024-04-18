package com.backend.chmiel.exception;

public class TaskCommentNotFoundException extends Exception {
    public TaskCommentNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
