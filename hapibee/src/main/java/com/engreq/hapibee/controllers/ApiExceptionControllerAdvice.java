package com.engreq.hapibee.controllers;

import com.engreq.hapibee.dto.ResponseMessageDTO;
import com.microsoft.sqlserver.jdbc.SQLServerException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class ApiExceptionControllerAdvice {

    @ExceptionHandler(IllegalArgumentException.class)
    protected ResponseEntity<ResponseMessageDTO> handleDataIntegrityViolation(IllegalArgumentException exception) {
        String message = exception.getMessage();
        return ResponseEntity
                .badRequest()
                .body(new ResponseMessageDTO(message));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ResponseMessageDTO> handleHttpMessageNotReadableException(HttpMessageNotReadableException exception) {
        String message = exception.getMessage();
        return ResponseEntity
                .badRequest()
                .body(new ResponseMessageDTO(message));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ResponseMessageDTO>> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        System.out.println(exception.getMessage());
        List<ResponseMessageDTO> response = new ArrayList<>();
        List<FieldError> fieldErrors = exception.getBindingResult().getFieldErrors();
        for (FieldError fieldError : fieldErrors) {
            String fieldName = fieldError.getField();
            String message = fieldError.getDefaultMessage();
            System.out.println("Field " + fieldName + " failed validation: " + message);
            response.add(new ResponseMessageDTO(message));
        }
        return ResponseEntity
                .badRequest()
                .body(response);
    }

    @ExceptionHandler(SQLServerException.class)
    public ResponseEntity<ResponseMessageDTO> handleSQLServerException(SQLServerException exception) {
        String message = exception.getMessage();
        return ResponseEntity
                .badRequest()
                .body(new ResponseMessageDTO(message));
    }

}
