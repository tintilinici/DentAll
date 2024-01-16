package com.dentall.dentallservice.model.request;

import com.dentall.dentallservice.model.domain.TransportVehicleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTransportVehicleRequest {

    private int capacity;

    private TransportVehicleType transportVehicleType;

    private String transportCompanyId;
}
