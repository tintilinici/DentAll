package com.dentall.dentallservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientDto {

    private String id;

    private String firstName;

    private String lastName;

    private String PIN;

    private String phoneNumber;

    private String email;
}
