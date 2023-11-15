package com.dentall.dentallservice.model.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Accommodation {

    @Id
    private String id;

    @Enumerated(EnumType.STRING)
    private AccommodationType accommodationType;

    private String address;

    private LocalDate availabilityStart;

    private LocalDate availabilityEnd;

    @Column(columnDefinition = "geometry(Point,4326)")
    private Point location;

    @OneToMany(mappedBy = "accommodation")
    private List<AccommodationBooking> accommodationBookings;


}
