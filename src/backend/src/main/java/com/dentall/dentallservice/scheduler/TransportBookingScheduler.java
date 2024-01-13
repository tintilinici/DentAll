package com.dentall.dentallservice.scheduler;

import com.dentall.dentallservice.model.domain.MedicalTreatment;
import com.dentall.dentallservice.repository.MedicalTreatmentRepository;
import com.dentall.dentallservice.service.TransportVehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TransportBookingScheduler {

    @Autowired
    private TransportVehicleService transportVehicleService;

    @Autowired
    private MedicalTreatmentRepository medicalTreatmentRepository;

    @Scheduled(fixedRate = 2000)
    public void assignTransportVehicles() {
        List<MedicalTreatment> mtWithMissingBookings = medicalTreatmentRepository.findByTransportBookingIsNull();

        transportVehicleService.assignVehicles(mtWithMissingBookings);
    }
}
