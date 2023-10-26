package com.dentall.dentallservice.repository;

import com.dentall.dentallservice.model.domain.AccommodationBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccommodationBookingRepository extends JpaRepository<AccommodationBooking, String> {

    List<AccommodationBooking> findByAccommodationId(String id);

    List<AccommodationBooking> findByCustomerId(String id);
}
