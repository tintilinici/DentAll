package com.dentall.dentallservice.repository;

import com.dentall.dentallservice.model.domain.AccommodationOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AccommodationOrderRepository extends JpaRepository<AccommodationOrder, String> {
    List<AccommodationOrder> findByArrivalDateTimeBetweenOrDepartureDateTimeBetween(LocalDateTime arrivalDatetime, LocalDateTime departureDatetime, LocalDateTime arrivalDatetime1, LocalDateTime departureDatetime1);


    List<AccommodationOrder> findByArrivalDateTimeAfterAndMedicalTreatmentsIsNull(LocalDateTime date);
/*
    List<AccommodationOrder> findByAccommodationId(String id);

    List<AccommodationOrder> findByPatientId(String id);

    boolean existsOrderByAccommodationId(String id);

    void deleteOrderByAccommodationId(String id);

    void deleteOrderByPatientIdAndStartDateBetween(String patientId, LocalDateTime dateTimeStart, LocalDateTime dateTimeEnd);*/
}
