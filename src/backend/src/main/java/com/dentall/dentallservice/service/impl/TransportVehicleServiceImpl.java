package com.dentall.dentallservice.service.impl;

import com.dentall.dentallservice.exception.exceptions.TransportVehicleNotFoundException;
import com.dentall.dentallservice.mapper.TransportVehicleMapper;
import com.dentall.dentallservice.model.domain.MedicalTreatment;
import com.dentall.dentallservice.model.domain.Patient;
import com.dentall.dentallservice.model.domain.TransportBooking;
import com.dentall.dentallservice.model.domain.TransportCompany;
import com.dentall.dentallservice.model.domain.TransportVehicle;
import com.dentall.dentallservice.model.dto.TransportVehicleDto;
import com.dentall.dentallservice.model.request.CreateTransportVehicleRequest;
import com.dentall.dentallservice.repository.MedicalTreatmentRepository;
import com.dentall.dentallservice.repository.TransportBookingRepository;
import com.dentall.dentallservice.repository.TransportCompanyRepository;
import com.dentall.dentallservice.repository.TransportVehicleRepository;
import com.dentall.dentallservice.service.EmailService;
import com.dentall.dentallservice.service.TransportVehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TransportVehicleServiceImpl implements TransportVehicleService {

    @Autowired
    private TransportVehicleMapper transportVehicleMapper;

    @Autowired
    private EmailService emailService;

    @Autowired
    private TransportBookingRepository transportBookingRepository;

    @Autowired
    private TransportVehicleRepository transportVehicleRepository;

    @Autowired
    private TransportCompanyRepository transportCompanyRepository;

    @Autowired
    private MedicalTreatmentRepository medicalTreatmentRepository;

    @Override
    public TransportVehicleDto createTransportVehicle(CreateTransportVehicleRequest request) {
        TransportCompany transportCompany = transportCompanyRepository.findById(request.getTransportCompanyId())
                .orElseThrow(() -> new IllegalArgumentException("Company with id: '" + request.getTransportCompanyId() +
                        "' does not exist!"));

        TransportVehicle transportVehicle = transportVehicleMapper.requestToModel(request);
        transportVehicle.setTransportCompany(transportCompany);
        transportVehicleRepository.save(transportVehicle);

        transportCompany.addTransportVehicle(transportVehicle);
        transportCompanyRepository.save(transportCompany);

        return transportVehicleMapper.modelToDto(transportVehicle);
    }

    @Override
    public void deleteTransportVehicle(String id) {
        TransportVehicle vehicle = transportVehicleRepository.findById(id)
                .orElseThrow(() -> new TransportVehicleNotFoundException(id));

        vehicle.getTransportCompany().removeTransportVehicle(vehicle);
        transportVehicleRepository.deleteById(id);
    }

    @Override
    public TransportVehicleDto retrieveTransportVehicleById(String id) {
        TransportVehicle transportVehicle = transportVehicleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Transport Vehicle with id: '" + id + "' does not exist!"));

        return transportVehicleMapper.modelToDto(transportVehicle);
    }

    @Override
    public List<TransportVehicleDto> retrieveAllTransportVehicles() {
        List<TransportVehicle> transportVehicles = transportVehicleRepository.findAll();
        return transportVehicleMapper.modelsToDtos(transportVehicles);
    }

    //check that vehicle does not have associated medical bookings for that time period
    @Override
    public void assignVehicles(List<MedicalTreatment> mtWithMissingBookings) {

        mtWithMissingBookings.forEach(medicalTreatment -> {
            if (medicalTreatment.getAccommodationOrder().getAccommodationBooking() != null) {
                List<TransportVehicle> availableVehicles = transportVehicleRepository
                        .findAvailableVehicles(
                                medicalTreatment.getStartDateTime(),
                                medicalTreatment.getEndDatetime()
                        );

                if (!availableVehicles.isEmpty()) {
                    TransportVehicle vehicle = availableVehicles.get(0);
                    TransportBooking booking = TransportBooking.builder()
                            .id(UUID.randomUUID().toString())
                            .medicalTreatment(medicalTreatment)
                            .build();

                    transportBookingRepository.save(booking);
                    vehicle.addTransportBooking(booking);
                    transportVehicleRepository.save(vehicle);
                    medicalTreatment.setTransportBooking(booking);
                    medicalTreatmentRepository.save(medicalTreatment);

                    String driverEmail = booking.getTransportVehicle().getTransportCompany().getEmail();
                    Patient patient = medicalTreatment.getAccommodationOrder().getPatient();
                    String patientEmail = patient.getEmail();
                    String patientPhoneNumber = patient.getPhoneNumber();
                    String patientName = patient.getFirstName() + " " + patient.getLastName();
                    String clinicAddress = medicalTreatment.getClinicAddress();
                    String accommodationAddress = medicalTreatment
                            .getAccommodationOrder()
                            .getAccommodationBooking()
                            .getAccommodation()
                            .getAddress();
                    emailService.sendBookingEmailToDriver(driverEmail, patientEmail, patientPhoneNumber, clinicAddress, accommodationAddress);
                    emailService.sendBookingEmailToPatient(driverEmail, patientEmail, clinicAddress, accommodationAddress, patientName);

                    System.out.println("Assigned vehicle: '" + vehicle.getId() + "' to medical" +
                            " treatment: '" + medicalTreatment.getId() + "'.");
                }
            }
        });
    }
}
