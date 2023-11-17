package com.dentall.dentallservice.exception.exceptions;

public class PatientNotFoundException extends RuntimeException {


    public PatientNotFoundException(String id) {
        super("Patient with id: '" + id + "' not found!");
    }
}
