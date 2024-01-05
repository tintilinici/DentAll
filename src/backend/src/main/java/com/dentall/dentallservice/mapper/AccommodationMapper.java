package com.dentall.dentallservice.mapper;

import com.dentall.dentallservice.model.domain.Accommodation;
import com.dentall.dentallservice.model.dto.AccommodationDto;
import com.dentall.dentallservice.model.request.CreateAccommodationRequest;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AccommodationMapper {

    @Mapping(target = "id", expression = "java(java.util.UUID.randomUUID().toString())")
    @Mapping(target = "location", expression = "java(toPoint(request.getLongitude(), request.getLatitude()))")
    @Mapping(target = "availabilityStart", source = "availabilityStart")
    @Mapping(target = "availabilityEnd", source = "availabilityEnd")
    Accommodation requestToModel(CreateAccommodationRequest request);

    @Mapping(target = "longitude", expression = "java(String.valueOf(accommodation.getLocation().getX()))")
    @Mapping(target = "latitude", expression = "java(String.valueOf(accommodation.getLocation().getY()))")
    @Mapping(target = "availabilityStart", source = "availabilityStart")
    @Mapping(target = "availabilityEnd", source = "availabilityEnd")
    AccommodationDto modelToDto(Accommodation accommodation);

    List<AccommodationDto> modelsToDtos(List<Accommodation> accommodations);

    @Named("toPoint")
    default Point toPoint(String longitude, String latitude) {
        GeometryFactory geometryFactory = new GeometryFactory();
        return geometryFactory.createPoint(new Coordinate(Double.parseDouble(longitude), Double.parseDouble(latitude)));
    }

}
