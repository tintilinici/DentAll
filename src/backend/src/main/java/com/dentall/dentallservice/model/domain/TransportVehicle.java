package com.dentall.dentallservice.model.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TransportVehicle {

    @Id
    private String id;

    private int capacity;

    @Enumerated(EnumType.STRING)
    private TransportVehicleType transportVehicleType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "transportCompanyId")
    private TransportCompany transportCompany;

    @OneToMany(mappedBy = "transportVehicle", fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    private List<TransportBooking> transportBookings;

    public void addTransportBooking(TransportBooking transportBooking) {
        if (transportBookings == null) {
            this.transportBookings = new ArrayList<>();
        }

        if(transportBooking != null) {
            transportBookings.add(transportBooking);
            transportBooking.setTransportVehicle(this);
        }
    }
}