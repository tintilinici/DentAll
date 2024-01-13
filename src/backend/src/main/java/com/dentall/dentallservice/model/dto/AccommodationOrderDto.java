package com.dentall.dentallservice.model.dto;

import com.dentall.dentallservice.model.domain.AccommodationType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationOrderDto {

    private String accommodationOrderId;

    private LocalDateTime arrivalDatetime;

    private LocalDateTime departureDatetime;

    private int accommodationSize;

    private AccommodationType accommodationType;

    private String patientId;



}
