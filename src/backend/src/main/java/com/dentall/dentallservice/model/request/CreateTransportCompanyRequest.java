package com.dentall.dentallservice.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTransportCompanyRequest {

    private String name;
    private String email;
    private String phoneNumber;
}
