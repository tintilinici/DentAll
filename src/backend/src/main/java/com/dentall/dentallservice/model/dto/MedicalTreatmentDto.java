package com.dentall.dentallservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
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
