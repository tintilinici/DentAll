package com.dentall.dentallservice.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateAccommodationBookingRequest {

    private String accommodationOrderId;

    private String latitude;

    private String longitude;
}
