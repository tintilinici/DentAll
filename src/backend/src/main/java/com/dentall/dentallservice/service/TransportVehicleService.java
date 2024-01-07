package com.dentall.dentallservice.service;

import com.dentall.dentallservice.model.domain.MedicalTreatment;
import com.dentall.dentallservice.model.dto.TransportVehicleDto;
import com.dentall.dentallservice.model.request.CreateTransportVehicleRequest;

import java.util.List;

public interface TransportVehicleService {
    TransportVehicleDto createTransportVehicle(CreateTransportVehicleRequest request);

    void deleteTransportVehicle(String id);

    TransportVehicleDto retrieveTransportVehicleById(String id);

    List<TransportVehicleDto> retrieveAllTransportVehicles();

    void assignVehicles(List<MedicalTreatment> mtWithMissingBookings);
}
