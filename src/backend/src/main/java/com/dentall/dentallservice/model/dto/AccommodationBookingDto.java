package com.dentall.dentallservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationBookingDto {
    private String id;

    private AccommodationDto accommodation;

    private AccommodationOrderDto order;
}
