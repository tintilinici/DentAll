package com.dentall.dentallservice.factory;

import com.dentall.dentallservice.model.domain.Accommodation;
import com.dentall.dentallservice.model.domain.AccommodationBooking;
import com.dentall.dentallservice.model.domain.Patient;
import com.dentall.dentallservice.model.request.BookAccommodationRequest;

import java.time.LocalDateTime;
import java.util.UUID;

public final class AccommodationBookingFactory {

    private AccommodationBookingFactory() {}

    public static AccommodationBooking create(BookAccommodationRequest request, Patient patient, Accommodation availableAccommodation) {
        return AccommodationBooking.builder()
                .id(UUID.randomUUID().toString())
                .patient(patient)
                .accommodation(availableAccommodation)
                .startDate(LocalDateTime.from(request.getBooking_start()))
                .endDate(LocalDateTime.from(request.getBooking_end()))
                .build();
    }
}
