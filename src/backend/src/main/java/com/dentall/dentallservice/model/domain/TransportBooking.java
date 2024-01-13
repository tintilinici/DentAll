package com.dentall.dentallservice.model.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TransportBooking {

    @Id
    private String id;

    @OneToOne
    @JoinColumn(name = "medical_treatment_id", referencedColumnName = "id")
    private MedicalTreatment medicalTreatment;

    @ManyToOne
    private TransportVehicle transportVehicle;
}
