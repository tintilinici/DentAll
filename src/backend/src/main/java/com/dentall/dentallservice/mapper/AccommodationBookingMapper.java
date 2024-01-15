package com.dentall.dentallservice.mapper;

import com.dentall.dentallservice.model.domain.AccommodationBooking;
import com.dentall.dentallservice.model.dto.AccommodationBookingDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {AccommodationMapper.class, AccommodationOrderMapper.class})
public interface AccommodationBookingMapper {

    AccommodationBookingDto modelToDto(AccommodationBooking model);

    List<AccommodationBookingDto> modelsToDtos(List<AccommodationBooking> models);
}
