package com.dentall.dentallservice.service.impl;

import com.dentall.dentallservice.exception.exceptions.TransportVehicleNotFoundException;
import com.dentall.dentallservice.mapper.TransportVehicleMapper;
import com.dentall.dentallservice.model.domain.TransportVehicle;
import com.dentall.dentallservice.model.dto.TransportVehicleDto;
import com.dentall.dentallservice.model.request.CreateTransportVehicleRequest;
import com.dentall.dentallservice.repository.TransportVehicleRepository;
import com.dentall.dentallservice.service.TransportVehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransportVehicleServiceImpl implements TransportVehicleService {

    @Autowired
    private TransportVehicleMapper transportVehicleMapper;

    @Autowired
    private TransportVehicleRepository transportVehicleRepository;

    @Override
    public TransportVehicleDto createTransportVehicle(CreateTransportVehicleRequest request) {
        TransportVehicle transportVehicle = transportVehicleMapper.requestToModel(request);
        transportVehicleRepository.save(transportVehicle);
        return transportVehicleMapper.modelToDto(transportVehicle);
    }

    @Override
    public void deleteTransportVehicle(String id) {
        boolean vehicleExists = transportVehicleRepository.existsById(id);
        if (!vehicleExists)
            throw new TransportVehicleNotFoundException(id);

        transportVehicleRepository.deleteById(id);
    }
}
