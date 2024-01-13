package com.dentall.dentallservice.mapper;

import com.dentall.dentallservice.model.domain.AccommodationBooking;
import com.dentall.dentallservice.model.dto.AccommodationBookingDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AccommodationBookingMapper {

    @Mapping(target = "patientId", source = "patient.id")
    @Mapping(target = "accommodationId", source = "accommodation.id")
    AccommodationBookingDto modelToDto(AccommodationBooking model);

    List<AccommodationBookingDto> modelsToDtos(List<AccommodationBooking> models);
}
