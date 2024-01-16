package com.dentall.dentallservice.mapper;

import com.dentall.dentallservice.model.domain.TransportCompany;
import com.dentall.dentallservice.model.dto.TransportCompanyDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "Spring", uses = TransportVehicleMapper.class)
public interface TransportCompanyMapper {

    @Mapping(target = "transportVehicles", source = "transportVehicles")
    TransportCompanyDto modelToDto(TransportCompany transportCompany);

    List<TransportCompanyDto> modelsToDtos(List<TransportCompany> transportCompanies);
}
