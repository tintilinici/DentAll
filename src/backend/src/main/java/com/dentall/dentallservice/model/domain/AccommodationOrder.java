package com.dentall.dentallservice.model.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccommodationOrder {
    @Id
    private String id;

    private LocalDateTime arrivalDateTime;

    private LocalDateTime departureDateTime;

    private int accommodationSize;

    @Column(columnDefinition = "geometry(Point,4326)")
    private Point location;

    @Enumerated(EnumType.STRING)
    private AccommodationType accommodationType;

    @ManyToOne
    private Patient patient;

    @OneToMany(mappedBy = "accommodationOrder")
    private List<MedicalTreatment> medicalTreatments;

    @OneToOne
    private AccommodationBooking accommodationBooking;
}
