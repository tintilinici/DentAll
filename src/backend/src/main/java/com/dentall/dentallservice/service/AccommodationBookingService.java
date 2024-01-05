package com.dentall.dentallservice.service;

import com.dentall.dentallservice.model.dto.AccommodationBookingDto;
import com.dentall.dentallservice.model.request.CreateAccommodationBookingRequest;

import java.time.LocalDate;
import java.util.List;

public interface AccommodationBookingService {

    AccommodationBookingDto createAccommodationBooking(CreateAccommodationBookingRequest request);

    List<AccommodationBookingDto> retrieveAccommodationBookings(String accommodationId, String patientId);

    AccommodationBookingDto retrieveAccommodationBooking(String id);


    void deleteAccommodationBooking(String id);

    void deleteAccommodationBookingByAccommodationId(String id);

    void deleteAccommodationBooking(String patientId, LocalDate startDate);
}
