package com.dentall.dentallservice.mapper;

import com.dentall.dentallservice.model.domain.Patient;
import com.dentall.dentallservice.model.dto.PatientDto;
import com.dentall.dentallservice.model.request.CreatePatientRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "Spring")
public interface PatientMapper {

    @Mapping(target = "id", expression = "java(java.util.UUID.randomUUID().toString())")
    Patient requestToModel(CreatePatientRequest request);


    PatientDto modelToDto(Patient patient);
    List<PatientDto> modelsToDtos(List<Patient> patients);
}
