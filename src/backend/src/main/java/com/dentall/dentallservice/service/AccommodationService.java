package com.dentall.dentallservice.service;

import com.dentall.dentallservice.model.dto.AccommodationBookingDto;
import com.dentall.dentallservice.model.dto.AccommodationDto;
import com.dentall.dentallservice.model.request.BookAccommodationRequest;
import com.dentall.dentallservice.model.request.CreateAccommodationRequest;
import com.dentall.dentallservice.model.request.SearchAccommodationBookingRequest;
import com.dentall.dentallservice.model.request.SearchAccommodationsRequest;

import java.util.List;

public interface AccommodationService {

    AccommodationDto createAccommodation(CreateAccommodationRequest request);


    List<AccommodationDto> searchAccommodations(SearchAccommodationsRequest request);

    AccommodationBookingDto bookAccommodation(BookAccommodationRequest request);

    AccommodationDto retrieveAccommodation(String id);

    List<AccommodationBookingDto> searchAccommodationBookings(SearchAccommodationBookingRequest request);

    AccommodationBookingDto retrieveAccommodationBooking(String id);
}
