package com.dentall.dentallservice.service.impl;

import com.dentall.dentallservice.factory.TransportCompanyFactory;
import com.dentall.dentallservice.mapper.TransportCompanyMapper;
import com.dentall.dentallservice.model.domain.TransportCompany;
import com.dentall.dentallservice.model.domain.TransportVehicle;
import com.dentall.dentallservice.model.dto.TransportCompanyDto;
import com.dentall.dentallservice.model.request.CreateTransportCompanyRequest;
import com.dentall.dentallservice.model.request.UpdateTransportCompanyRequest;
import com.dentall.dentallservice.repository.TransportCompanyRepository;
import com.dentall.dentallservice.repository.TransportVehicleRepository;
import com.dentall.dentallservice.service.TransportCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransportCompanyServiceImpl implements TransportCompanyService {

    @Autowired
    private TransportCompanyRepository transportCompanyRepository;

    @Autowired
    private TransportCompanyMapper transportCompanyMapper;

    @Autowired
    private TransportVehicleRepository transportVehicleRepository;

    @Override
    public TransportCompanyDto createTransportCompany(CreateTransportCompanyRequest request) {
        transportCompanyRepository.findByEmailOrPhoneNumber(
                request.getEmail(),
                request.getPhoneNumber()
        ).stream().findAny().ifPresent((company) -> {
            throw new IllegalArgumentException("That transport company already exists!");
        });

        TransportCompany transportCompany = TransportCompanyFactory.create(request);
        transportCompanyRepository.save(transportCompany);
        return transportCompanyMapper.modelToDto(transportCompany);
    }

    @Override
    public TransportCompanyDto retrieveTransportCompanyById(String id) {
        TransportCompany company = transportCompanyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Transport company with id: '" + id + "' not found!"));

        return transportCompanyMapper.modelToDto(company);
    }

    @Override
    public List<TransportCompanyDto> retrieveALlTransportCompanies() {
        List<TransportCompany> transportCompanies = transportCompanyRepository.findAll();

        return transportCompanyMapper.modelsToDtos(transportCompanies);
    }

    @Override
    public void deleteTransportCompany(String id) {
        TransportCompany transportCompany = transportCompanyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Transport company with id: '" + id + "' not found!"));

        if (transportCompany.getTransportVehicles() != null && !transportCompany.getTransportVehicles().isEmpty()) {
            throw new IllegalArgumentException("You first need to delete companies' transport vehicles to delete the " +
                    "company!");
        }

        transportCompanyRepository.deleteById(id);
    }

    @Override
    public TransportCompanyDto assignVehicles(String companyId, List<String> vehiclesIds) {
        TransportCompany transportCompany = transportCompanyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Transport company with id: '" + companyId + "' not found!"));

        vehiclesIds.forEach(id -> {
            TransportVehicle vehicle = transportVehicleRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Vehicle with id: '" + id + "' does not exist!"));

            if (vehicle.getTransportCompany() != null) {
                throw new IllegalArgumentException("Transport vehicle with id: '" + id + "' is already assigned to" +
                        " company '" + vehicle.getTransportCompany().getName() + "' with id: '" +
                        vehicle.getTransportCompany().getId() + "'.");
            }

            transportCompany.addTransportVehicle(vehicle);
        });

        transportCompanyRepository.save(transportCompany);
        return transportCompanyMapper.modelToDto(transportCompany);
    }

    @Override
    public TransportCompanyDto updateTransportCompany(String id, UpdateTransportCompanyRequest request) {
        TransportCompany transportCompany = transportCompanyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Transport company with id: '" + id + "' not found!"));

        if (request.getEmail() != null) {
            transportCompany.setEmail(request.getEmail());
        }
        if (request.getPhoneNumber() != null) {
            transportCompany.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getName() != null) {
            transportCompany.setName(request.getName());
        }

        transportCompanyRepository.save(transportCompany);
        return transportCompanyMapper.modelToDto(transportCompany);
    }
}
