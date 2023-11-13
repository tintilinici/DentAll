package com.dentall.dentallservice.model.dto;

import com.dentall.dentallservice.model.domain.TransportVehicleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransportVehicleDto {

    private String id;

    private int capacity;

    private TransportVehicleType transportVehicleType;

    private String transportCompanyId;
}
