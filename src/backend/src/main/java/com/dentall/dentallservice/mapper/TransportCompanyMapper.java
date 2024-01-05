package com.dentall.dentallservice.mapper;

import com.dentall.dentallservice.model.domain.TransportCompany;
import com.dentall.dentallservice.model.domain.TransportVehicle;
import com.dentall.dentallservice.model.dto.TransportCompanyDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "Spring")
public interface TransportCompanyMapper {

    @Mapping(target = "transportVehiclesIds", source = "transportVehicles", qualifiedByName = "mapVehiclesToIds")
    TransportCompanyDto modelToDto(TransportCompany transportCompany);

    List<TransportCompanyDto> modelsToDtos(List<TransportCompany> transportCompanies);

    @Named("mapVehiclesToIds")
    default List<String> mapVehiclesToIds(List<TransportVehicle> vehicles) {
        if (vehicles == null) {
            return Collections.emptyList();
        }
        return vehicles.stream()
                .map(TransportVehicle::getId)
                .collect(Collectors.toList());
    }
}
