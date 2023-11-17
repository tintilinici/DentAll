package com.dentall.dentallservice.exception.exceptions;

public class AccommodationOrderNotFoundException extends RuntimeException {

    public AccommodationOrderNotFoundException(String orderId) {
        super("Accommodation order with id: '" + orderId + "' not found!");
    }
}
