package com.dentall.dentallservice.service.impl;

import com.dentall.dentallservice.factory.TransportCompanyFactory;
import com.dentall.dentallservice.mapper.TransportCompanyMapper;
import com.dentall.dentallservice.model.domain.TransportCompany;
import com.dentall.dentallservice.model.dto.TransportCompanyDto;
import com.dentall.dentallservice.model.request.CreateTransportCompanyRequest;
import com.dentall.dentallservice.repository.TransportCompanyRepository;
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

    @Override
    public TransportCompanyDto createTransportCompany(CreateTransportCompanyRequest request) {
        transportCompanyRepository.findByEmailOrPhoneNumber(
                request.getEmail(),
                request.getPhoneNumber()
        ).stream().findAny().ifPresent((company) -> {
            throw new IllegalArgumentException("That transport company already exists!");
        });

        TransportCompany transportCompany = TransportCompanyFactory.create(request);

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

        if (transportCompany.getTransportVehicles() == null || transportCompany.getTransportVehicles().isEmpty()) {
            throw new IllegalArgumentException("You first need to delete companies' transport vehicles to delete the company!");
        }

        transportCompanyRepository.deleteById(id);
    }
}
