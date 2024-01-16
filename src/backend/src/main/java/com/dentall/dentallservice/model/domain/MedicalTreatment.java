package com.dentall.dentallservice.model.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@ToString
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

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    private TransportBooking transportBooking;
}
