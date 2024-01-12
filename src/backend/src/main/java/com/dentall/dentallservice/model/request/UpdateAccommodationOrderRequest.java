package com.dentall.dentallservice.model.request;

import com.dentall.dentallservice.model.domain.AccommodationBooking;
import com.dentall.dentallservice.model.domain.AccommodationType;
import com.dentall.dentallservice.model.domain.MedicalTreatment;
import com.dentall.dentallservice.model.domain.Patient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAccommodationOrderRequest {
    private LocalDateTime arrivalDateTime;

    private LocalDateTime departureDateTime;

    private int accommodationSize;

    private AccommodationType accommodationType;

}
