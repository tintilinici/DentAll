package com.dentall.dentallservice.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookAccommodationRequest {

    private String accommodationOrderId;

    private String latitude;

    private String longitude;
}
