package com.dentall.dentallservice.exception.exceptions;

public class AccommodationNotFound extends RuntimeException {
    public AccommodationNotFound(String id) {
        super("Accommodation with id: '" + id + "' not found!");
    }
}
