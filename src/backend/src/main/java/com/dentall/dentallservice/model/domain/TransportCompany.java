package com.dentall.dentallservice.model.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
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

    @OneToMany(mappedBy = "transportCompany", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<TransportVehicle> transportVehicles;

    public void addTransportVehicle(TransportVehicle transportVehicle) {
        if (transportVehicle == null) return;

        if (transportVehicles == null) {
            transportVehicles = new ArrayList<>();
        }

        transportVehicles.add(transportVehicle);
        transportVehicle.setTransportCompany(this);
    }
}