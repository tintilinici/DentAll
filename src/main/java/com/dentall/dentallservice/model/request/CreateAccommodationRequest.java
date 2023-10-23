package com.dentall.dentallservice.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateAccommodationRequest {

    private String accommodationType;

    private String address;

    private LocalDate availability_start;

    private LocalDate availability_end;

    private String latitude;

    private String longitude;
}
