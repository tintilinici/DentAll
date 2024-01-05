package com.dentall.dentallservice.service;

import com.dentall.dentallservice.model.dto.AccommodationBookingDto;
import com.dentall.dentallservice.model.dto.AccommodationDto;
import com.dentall.dentallservice.model.request.BookAccommodationRequest;
import com.dentall.dentallservice.model.request.CreateAccommodationRequest;
import com.dentall.dentallservice.model.request.DeleteAccommodationBookingRequest;
import com.dentall.dentallservice.model.request.SearchAccommodationBookingRequest;
import com.dentall.dentallservice.model.request.SearchAccommodationsRequest;
import com.dentall.dentallservice.model.request.UpdateAccommodationRequest;

import java.util.List;

public interface AccommodationService {

    AccommodationDto createAccommodation(CreateAccommodationRequest request);


    List<AccommodationDto> searchAccommodations(String latitude, String longitude);


    AccommodationDto retrieveAccommodation(String id);

    void deleteAccommodation(String id);

    AccommodationDto updateAccommodation(String id, UpdateAccommodationRequest request);
}
