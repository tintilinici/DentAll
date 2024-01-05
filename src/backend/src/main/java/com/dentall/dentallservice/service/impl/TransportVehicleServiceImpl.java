package com.dentall.dentallservice.service.impl;

import com.dentall.dentallservice.exception.exceptions.TransportVehicleNotFoundException;
import com.dentall.dentallservice.mapper.TransportVehicleMapper;
import com.dentall.dentallservice.model.domain.TransportCompany;
import com.dentall.dentallservice.model.domain.TransportVehicle;
import com.dentall.dentallservice.model.dto.TransportVehicleDto;
import com.dentall.dentallservice.model.request.CreateTransportVehicleRequest;
import com.dentall.dentallservice.repository.TransportCompanyRepository;
import com.dentall.dentallservice.repository.TransportVehicleRepository;
import com.dentall.dentallservice.service.TransportVehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransportVehicleServiceImpl implements TransportVehicleService {

    @Autowired
    private TransportVehicleMapper transportVehicleMapper;

    @Autowired
    private TransportVehicleRepository transportVehicleRepository;

    @Autowired
    private TransportCompanyRepository transportCompanyRepository;

    @Override
    public TransportVehicleDto createTransportVehicle(CreateTransportVehicleRequest request) {
        TransportCompany transportCompany = transportCompanyRepository.findById(request.getTransportCompanyId())
                .orElseThrow(() -> new IllegalArgumentException("Company with id: '" + request.getTransportCompanyId() +
                        "' does not exist!"));

        TransportVehicle transportVehicle = transportVehicleMapper.requestToModel(request);
        transportVehicleRepository.save(transportVehicle);
        transportCompany.addTransportVehicle(transportVehicle);
        transportCompanyRepository.save(transportCompany);
        return transportVehicleMapper.modelToDto(transportVehicle);
    }

    @Override
    public void deleteTransportVehicle(String id) {
        boolean vehicleExists = transportVehicleRepository.existsById(id);
        if (!vehicleExists)
            throw new TransportVehicleNotFoundException(id);

        transportVehicleRepository.deleteById(id);
    }

    @Override
    public TransportVehicleDto retrieveTransportVehicleById(String id) {
        TransportVehicle transportVehicle = transportVehicleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Transport Vehicle with id: '" + id + "' does not exist!"));

        return transportVehicleMapper.modelToDto(transportVehicle);
    }

    @Override
    public List<TransportVehicleDto> retrieveAllTransportVehicles() {
        List<TransportVehicle> transportVehicles = transportVehicleRepository.findAll();
        return transportVehicleMapper.modelsToDtos(transportVehicles);
    }
}
