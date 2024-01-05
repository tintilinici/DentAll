package com.dentall.dentallservice.model.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicalTreatment {

    @Id
    private String id;

    private String description;

    private String clinicAddress;

    private LocalDateTime startDateTime;

    private LocalDateTime endDatetime;

    @ManyToOne
    private AccommodationOrder accommodationOrder;

    @OneToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "id")
    private Patient patient;
}
