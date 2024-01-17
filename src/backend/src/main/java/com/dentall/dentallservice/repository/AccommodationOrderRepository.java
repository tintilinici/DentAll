package com.dentall.dentallservice.repository;

import com.dentall.dentallservice.model.domain.AccommodationOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface AccommodationOrderRepository extends JpaRepository<AccommodationOrder, String> {
    List<AccommodationOrder> findByPatientIdAndArrivalDateTimeIsBetweenOrDepartureDateTimeIsBetween(String patient_id, LocalDateTime arrivalDateTime, LocalDateTime arrivalDateTime2, LocalDateTime departureDateTime, LocalDateTime departureDateTime2);

    List<AccommodationOrder> findByArrivalDateTimeAfterAndMedicalTreatmentsIsNull(LocalDateTime date);
/*
    List<AccommodationOrder> findByAccommodationId(String id);

    List<AccommodationOrder> findByPatientId(String id);

    boolean existsOrderByAccommodationId(String id);

    void deleteOrderByAccommodationId(String id);

    void deleteOrderByPatientIdAndStartDateBetween(String patientId, LocalDateTime dateTimeStart, LocalDateTime dateTimeEnd);*/
}
