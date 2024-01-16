package com.dentall.dentallservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransportCompanyDto {
    private String id;

    private String name;

    private String email;

    private String phoneNumber;

    private List<TransportVehicleDto> transportVehicles;
}
