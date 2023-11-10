package com.dentall.dentallservice.model.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransportCompany {

    @Id
    private String id;

    private String name;

    private String email;

    private String phoneNumber;

    @OneToMany(mappedBy = "transportCompany")
    private List<TransportVehicle> transportVehicles;
}