package com.dentall.dentallservice.repository;


import com.dentall.dentallservice.model.domain.TransportVehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransportVehicleRepository extends JpaRepository<TransportVehicle, String> {

    @Query("SELECT tv FROM TransportVehicle tv WHERE NOT EXISTS (" +
            "SELECT tb FROM TransportBooking tb JOIN tb.medicalTreatment mt " +
            "WHERE tb.transportVehicle = tv AND (" +
            "mt.startDateTime < :startDateTime OR mt.endDatetime > :endDateTime))")
    List<TransportVehicle> findAvailableVehicles(LocalDateTime startDateTime, LocalDateTime endDateTime);
}
