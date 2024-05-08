package com.backend.chmiel.exception;

public class TaskNotFoundException extends Exception {
    public TaskNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
