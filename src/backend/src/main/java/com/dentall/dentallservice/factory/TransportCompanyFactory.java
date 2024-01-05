package com.dentall.dentallservice.factory;

import com.dentall.dentallservice.model.domain.TransportCompany;
import com.dentall.dentallservice.model.request.CreateTransportCompanyRequest;

import java.util.UUID;

public class TransportCompanyFactory {

    private TransportCompanyFactory() {}

    public static TransportCompany create(CreateTransportCompanyRequest request) {
        return TransportCompany.builder()
                .id(UUID.randomUUID().toString())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .name(request.getName())
                .build();
    }
}
