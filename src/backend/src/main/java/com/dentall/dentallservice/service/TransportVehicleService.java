package com.dentall.dentallservice.service;

import com.dentall.dentallservice.model.dto.TransportVehicleDto;
import com.dentall.dentallservice.model.request.CreateTransportVehicleRequest;

public interface TransportVehicleService {
    TransportVehicleDto createTransportVehicle(CreateTransportVehicleRequest request);

    void deleteTransportVehicle(String id);
}
