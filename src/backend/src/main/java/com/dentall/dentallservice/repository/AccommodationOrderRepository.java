package com.dentall.dentallservice.repository;

import com.dentall.dentallservice.model.domain.AccommodationOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface AccommodationOrderRepository extends JpaRepository<AccommodationOrder, String> {
    List<AccommodationOrder> findByArrivalDateTimeAfterAndMedicalTreatmentsIsNull(LocalDateTime date);

    List<AccommodationOrder> findByPatientIdAndArrivalDateTimeIsBetweenAndDepartureDateTimeIsBetween(String patientId, LocalDateTime arrivalDateTime, LocalDateTime departureDateTime, LocalDateTime arrivalDateTime1, LocalDateTime departureDateTime1);
/*
    List<AccommodationOrder> findByAccommodationId(String id);

    List<AccommodationOrder> findByPatientId(String id);

    boolean existsOrderByAccommodationId(String id);

    void deleteOrderByAccommodationId(String id);

    void deleteOrderByPatientIdAndStartDateBetween(String patientId, LocalDateTime dateTimeStart, LocalDateTime dateTimeEnd);*/

    @Query("SELECT ao FROM AccommodationOrder ao WHERE ao.patient.id = :patientId AND (ao.arrivalDateTime BETWEEN :startDateTime AND :endDateTime OR ao.departureDateTime BETWEEN :startDateTime AND :endDateTime)")
    List<AccommodationOrder> findByPatientIdAndDateTimeRanges(String patientId, LocalDateTime startDateTime, LocalDateTime endDateTime);
}
