package com.dentall.dentallservice.service;

import com.dentall.dentallservice.model.dto.AccommodationDto;
import com.dentall.dentallservice.model.request.CreateAccommodationRequest;
import com.dentall.dentallservice.model.request.UpdateAccommodationRequest;

import java.util.List;

public interface AccommodationService {

    AccommodationDto createAccommodation(CreateAccommodationRequest request);


    List<AccommodationDto> searchAccommodations(String latitude, String longitude);


    AccommodationDto retrieveAccommodation(String id);

    void deleteAccommodation(String id);

    AccommodationDto updateAccommodation(String id, UpdateAccommodationRequest request);

    List<AccommodationDto> retrieveAccommodations();
}
