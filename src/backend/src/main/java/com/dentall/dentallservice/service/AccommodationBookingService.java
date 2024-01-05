package com.dentall.dentallservice.service;

import com.dentall.dentallservice.model.dto.AccommodationBookingDto;
import com.dentall.dentallservice.model.request.BookAccommodationRequest;
import com.dentall.dentallservice.model.request.DeleteAccommodationBookingRequest;
import com.dentall.dentallservice.model.request.SearchAccommodationBookingRequest;

import java.time.LocalDate;
import java.util.List;

public interface AccommodationBookingService {

    AccommodationBookingDto bookAccommodation(BookAccommodationRequest request);

    List<AccommodationBookingDto> retrieveAccommodationBookings(String accommodationId, String patientId);

    AccommodationBookingDto retrieveAccommodationBooking(String id);


    void deleteAccommodationBooking(String id);

    void deleteAccommodationBookingByAccommodationId(String id);

    void deleteAccommodationBooking(String patientId, LocalDate startDate);
}
