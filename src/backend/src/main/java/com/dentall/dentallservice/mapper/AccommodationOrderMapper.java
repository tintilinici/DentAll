package com.dentall.dentallservice.mapper;

import com.dentall.dentallservice.model.domain.AccommodationOrder;
import com.dentall.dentallservice.model.dto.AccommodationBookingDto;
import com.dentall.dentallservice.model.dto.AccommodationOrderDto;
import com.dentall.dentallservice.model.request.CreateAccommodationOrderRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {PatientMapper.class})
public interface AccommodationOrderMapper {

    @Mapping(target = "accommodationBookingId", source = "accommodationBooking.id")
    @Mapping(target = "longitude", expression = "java(String.valueOf(accommodationOrder.getLocation().getX()))")
    @Mapping(target = "latitude", expression = "java(String.valueOf(accommodationOrder.getLocation().getY()))")
    AccommodationOrderDto modelToDto(AccommodationOrder accommodationOrder);

    List<AccommodationOrderDto> modelsToDtos(List<AccommodationOrder> models);
}
