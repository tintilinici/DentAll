package com.dentall.dentallservice.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePatientRequest {

    private String firstName;

    private String lastName;

    private String PIN;

    private String phoneNumber;

    private String email;
}
