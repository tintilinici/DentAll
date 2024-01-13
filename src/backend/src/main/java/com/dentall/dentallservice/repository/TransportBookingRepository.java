package com.dentall.dentallservice.repository;

import com.dentall.dentallservice.model.domain.TransportBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportBookingRepository extends JpaRepository<TransportBooking, String> {
}
