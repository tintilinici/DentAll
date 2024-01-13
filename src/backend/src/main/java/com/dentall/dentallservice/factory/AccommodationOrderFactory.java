package com.dentall.dentallservice.factory;

import com.dentall.dentallservice.model.domain.AccommodationOrder;
import com.dentall.dentallservice.model.domain.AccommodationType;
import com.dentall.dentallservice.model.domain.Patient;
import com.dentall.dentallservice.model.request.CreateAccommodationOrderRequest;

import java.time.LocalDateTime;
import java.util.UUID;

public class AccommodationOrderFactory {

    public static AccommodationOrder create(CreateAccommodationOrderRequest request, Patient patient){
        return AccommodationOrder.builder()
                .id(UUID.randomUUID().toString())
                .patient(patient)
                .accommodationSize(request.getAccommodationSize())
                .arrivalDateTime(LocalDateTime.from(request.getArrivalDatetime()))
                .departureDateTime(LocalDateTime.from(request.getDepartureDatetime()))
                .accommodationType(AccommodationType.valueOf(request.getAccommodationType()))
                .build();
    }
}
