package com.dentall.dentallservice.exception.exceptions;

public class NoBookingAvailableException extends RuntimeException {

    public NoBookingAvailableException() {
        super("No booking available for given criteria!");
    }
}
