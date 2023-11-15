package com.dentall.dentallservice.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePatientRequest {
    private String firstName;

    private String lastName;

    private String PIN;

    private String phone_number;

    private String email;
}
