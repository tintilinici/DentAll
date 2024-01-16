package com.dentall.dentallservice.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTransportCompanyRequest {

    private String name;

    private String email;

    private String phoneNumber;
}
