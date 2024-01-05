package com.dentall.dentallservice.model.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @Enumerated(EnumType.STRING)
    private AccommodationType accommodationType;

    @ManyToOne
    private Patient patient;


}
