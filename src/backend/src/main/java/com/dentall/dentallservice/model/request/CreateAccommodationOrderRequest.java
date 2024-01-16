package com.dentall.dentallservice.model.request;

import com.dentall.dentallservice.model.domain.AccommodationType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateAccommodationOrderRequest {

    private LocalDateTime arrivalDateTime;

    private LocalDateTime departureDateTime;

    private int accommodationSize;

    private String accommodationType;

    private String patientId;
}
