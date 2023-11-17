package com.dentall.dentallservice.model.request;

import com.dentall.dentallservice.model.domain.AccommodationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAccommodationRequest {
    private AccommodationType accommodationType;
    private String address;
    private LocalDate availabilityStart;
    private LocalDate availabilityEnd;
}
