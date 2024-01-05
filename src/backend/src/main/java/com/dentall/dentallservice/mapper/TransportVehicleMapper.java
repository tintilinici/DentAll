package com.dentall.dentallservice.mapper;

import com.dentall.dentallservice.model.domain.TransportVehicle;
import com.dentall.dentallservice.model.dto.TransportVehicleDto;
import com.dentall.dentallservice.model.request.CreateTransportVehicleRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "Spring")
public interface TransportVehicleMapper {

    @Mapping(target = "id", expression = "java(java.util.UUID.randomUUID().toString())")
    TransportVehicle requestToModel(CreateTransportVehicleRequest request);

    @Mapping(target = "transportCompanyId", source = "transportCompany.id")
    TransportVehicleDto modelToDto(TransportVehicle transportVehicle);

    List<TransportVehicleDto> modelsToDtos(List<TransportVehicle> transportVehicles);
}
