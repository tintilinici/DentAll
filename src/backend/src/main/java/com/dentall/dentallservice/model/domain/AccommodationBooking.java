package com.dentall.dentallservice.model.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationBooking {

    @Id
    private String id;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @ManyToOne
    private Accommodation accommodation;

    @ManyToOne
    private Patient patient;
}
