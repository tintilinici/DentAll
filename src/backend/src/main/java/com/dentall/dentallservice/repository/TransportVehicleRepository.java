package com.dentall.dentallservice.repository;


import com.dentall.dentallservice.model.domain.TransportVehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransportVehicleRepository extends JpaRepository<TransportVehicle, String> {
}
