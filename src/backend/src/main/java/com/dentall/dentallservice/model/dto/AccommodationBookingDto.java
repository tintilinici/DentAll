package com.dentall.dentallservice.model.dto;

import com.dentall.dentallservice.model.domain.Accommodation;
import com.dentall.dentallservice.model.domain.Customer;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationBookingDto {
    private String id;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String accommodationId;

    private String customerId;
}
