package com.dentall.dentallservice.exception.exceptions;

public class TransportVehicleNotFoundException extends RuntimeException{

    public TransportVehicleNotFoundException(String id) {
        super ("Transport vehicle with id : '" + id + " not found!");
    }
}
