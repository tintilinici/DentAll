package com.dentall.dentallservice.service;

import com.dentall.dentallservice.model.dto.TransportCompanyDto;
import com.dentall.dentallservice.model.request.CreateTransportCompanyRequest;
import com.dentall.dentallservice.model.request.UpdateTransportCompanyRequest;

import java.util.List;

public interface TransportCompanyService {
    TransportCompanyDto createTransportCompany(CreateTransportCompanyRequest request);

    TransportCompanyDto retrieveTransportCompanyById(String id);
    
    List<TransportCompanyDto> retrieveALlTransportCompanies();

    void deleteTransportCompany(String id);

    TransportCompanyDto assignVehicles(String id, List<String> vehiclesIds);

    TransportCompanyDto updateTransportCompany(String id, UpdateTransportCompanyRequest request);
}
