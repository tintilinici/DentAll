package com.dentall.dentallservice.model.request;

import com.dentall.dentallservice.model.domain.AccommodationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchAccommodationsRequest {
    private String latitude;
    private String longitude;
}
