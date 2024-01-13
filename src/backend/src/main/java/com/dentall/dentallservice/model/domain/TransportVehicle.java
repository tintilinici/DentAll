package com.dentall.dentallservice.model.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransportVehicle {

    @Id
    private String id;

    private int capacity;

    @Enumerated(EnumType.STRING)
    private TransportVehicleType transportVehicleType;

    @ManyToOne
    private TransportCompany transportCompany;
}