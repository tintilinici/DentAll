package com.dentall.dentallservice.repository;

import com.dentall.dentallservice.model.domain.AccommodationBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AccommodationBookingRepository extends JpaRepository<AccommodationBooking, String> {

    List<AccommodationBooking> findByAccommodationId(String id);

    List<AccommodationBooking> findByOrderPatientId(String id);

    boolean existsByOrderId(String id);

    boolean existsByAccommodationId(String id);

    void deleteByAccommodationId(String id);

    void deleteByOrderPatientIdAndOrderArrivalDateTimeBetween(String patientId, LocalDateTime dateTimeStart, LocalDateTime dateTimeEnd);
}
