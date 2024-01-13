package com.dentall.dentallservice.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateAccountRequest {

    private String email;
    private String password;
    private List<String> roles;
}
