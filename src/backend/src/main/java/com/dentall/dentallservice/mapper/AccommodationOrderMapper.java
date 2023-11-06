package com.dentall.dentallservice.mapper;

import com.dentall.dentallservice.model.domain.AccommodationOrder;
import com.dentall.dentallservice.model.dto.AccommodationBookingDto;
import com.dentall.dentallservice.model.dto.AccommodationOrderDto;
import com.dentall.dentallservice.model.request.CreateAccommodationOrderRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AccommodationOrderMapper {



    @Mapping(target = "patientId", source = "patient.id")

    AccommodationOrderDto modelToDto(AccommodationOrder model);

    List<AccommodationBookingDto> modelToDtos(List<AccommodationOrder> models);
}
