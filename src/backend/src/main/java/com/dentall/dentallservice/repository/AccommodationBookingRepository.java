package com.dentall.dentallservice.repository;

import com.dentall.dentallservice.model.domain.AccommodationBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AccommodationBookingRepository extends JpaRepository<AccommodationBooking, String> {

    List<AccommodationBooking> findByAccommodationId(String id);

    List<AccommodationBooking> findByPatientId(String id);

    boolean existsByAccommodationId(String id);

    void deleteByAccommodationId(String id);

    void deleteByPatientIdAndStartDateBetween(String patientId, LocalDateTime dateTimeStart, LocalDateTime dateTimeEnd);
}
