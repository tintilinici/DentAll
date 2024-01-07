package com.example.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FetchMedicalTreatmentsRequest {
    private String accommodationOrderId;
    private LocalDateTime arrivalDateTime;
    private LocalDateTime departureDateTime;
}
