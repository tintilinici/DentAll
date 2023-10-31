package com.dentall.dentallservice.exception.exceptions;

public class AccommodationBookingNotFoundException extends RuntimeException {

    public AccommodationBookingNotFoundException(String bookingId) {
        super("Accommodation booking with id: '" + bookingId + "' not found!");
    }
}
