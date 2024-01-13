package com.example.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicalTreatmentDto {

    private String id;
    private String accommodationOrderId;
    private String description;
    private String clinicAddress;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
}
