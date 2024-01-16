package com.dentall.dentallservice.model.dto;

import com.dentall.dentallservice.model.domain.AccommodationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationDto {

    private String id;

    private AccommodationType accommodationType;

    private String address;

    private LocalDate availabilityStart;

    private LocalDate availabilityEnd;

    private String latitude;

    private String longitude;
}
