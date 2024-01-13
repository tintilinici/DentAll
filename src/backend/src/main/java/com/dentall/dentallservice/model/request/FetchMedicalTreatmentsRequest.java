package com.dentall.dentallservice.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FetchMedicalTreatmentsRequest {
    private String accommodationOrderId;
    private LocalDateTime arrivalDateTime;
    private LocalDateTime departureDateTime;
}
