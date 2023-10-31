package com.dentall.dentallservice.exception.exceptions;

public class CustomerNotFoundException extends RuntimeException {


    public CustomerNotFoundException(String id) {
        super("Customer with id: '" + id + "' not found!");
    }
}
