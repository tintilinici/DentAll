package com.dentall.dentallservice.service.impl;

import com.dentall.dentallservice.exception.exceptions.AccommodationOrderNotFoundException;
import com.dentall.dentallservice.exception.exceptions.PatientNotFoundException;
import com.dentall.dentallservice.factory.AccommodationOrderFactory;
import com.dentall.dentallservice.mapper.AccommodationOrderMapper;
import com.dentall.dentallservice.mapper.PatientMapper;
import com.dentall.dentallservice.model.domain.AccommodationOrder;
import com.dentall.dentallservice.model.domain.Patient;
import com.dentall.dentallservice.model.dto.AccommodationOrderDto;
import com.dentall.dentallservice.model.dto.PatientDto;
import com.dentall.dentallservice.model.request.CreateAccommodationOrderRequest;
import com.dentall.dentallservice.model.request.CreatePatientRequest;
import com.dentall.dentallservice.model.request.UpdateAccommodationOrderRequest;
import com.dentall.dentallservice.model.request.UpdatePatientRequest;
import com.dentall.dentallservice.repository.AccommodationOrderRepository;
import com.dentall.dentallservice.repository.PatientRepository;
import com.dentall.dentallservice.service.PatientService;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientMapper patientMapper;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AccommodationOrderMapper accommodationOrderMapper;

    @Autowired
    private AccommodationOrderRepository accommodationOrderRepository;


    @Override
    public PatientDto createPatient(CreatePatientRequest request) {
        Patient patient = patientMapper.requestToModel(request);
        patientRepository.save(patient);
        return patientMapper.modelToDto(patient);
    }

    @Override
    public List<AccommodationOrderDto> searchAccommodationOrders(String patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new PatientNotFoundException(patientId));

        return accommodationOrderMapper.modelsToDtos(patient.getAccommodationOrders());
    }

    @Override
    public void deletePatient(String id) {
        boolean patientExists = patientRepository.existsById(id);
        if(!patientExists){
            throw new PatientNotFoundException("Patient with id: " + id + "doesn't exits.");
        }

        Patient patient = patientRepository.getReferenceById(id);
        List<AccommodationOrder> orders = patient.getAccommodationOrders();
        if(orders == null || !orders.isEmpty()){
            throw new RuntimeException("You can't delete this patient since it has accommodation orders");
        }

        patientRepository.deleteById(id);
    }

    @Override
    public PatientDto retrievePatient(String id){
        Patient patient = patientRepository.findById(id).orElseThrow(() -> new PatientNotFoundException("Patient with id: '" + id + "' not found!"));

        return patientMapper.modelToDto(patient);
    }

    @Override
    public PatientDto updatePatient(String id, UpdatePatientRequest request) {
        Patient patient = patientRepository.findById(id).orElseThrow(() -> new PatientNotFoundException(id));

        if(request.getFirstName() != null){
            patient.setFirstName(request.getFirstName());
        }
        if(request.getLastName() != null){
            patient.setLastName(request.getLastName());
        }
        if(request.getPIN() != null){
            patient.setPIN(request.getPIN());
        }
        if(request.getPhoneNumber() != null){
            patient.setPhoneNumber(request.getPhoneNumber());
        }
        if(request.getEmail() != null){
            patient.setEmail(request.getEmail());
        }
        patientRepository.save(patient);
        return patientMapper.modelToDto(patient);
    }

    @Override
    public List<PatientDto> retrieveAllPatients() {
        List<Patient> patients = patientRepository.findAll();

        return patientMapper.modelsToDtos(patients);
    }

    @Override
    public AccommodationOrderDto createAccommodationOrder(CreateAccommodationOrderRequest request){
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new PatientNotFoundException("Patient with id: '" + request.getPatientId() + "' not found!"));

        accommodationOrderRepository.findByPatientIdAndDateTimeRanges(
                request.getPatientId(),
                request.getArrivalDateTime(),
                request.getDepartureDateTime()
        ).stream().findAny().ifPresent((order) -> {
            throw new IllegalArgumentException("Patient: " + order.getPatient().getFirstName() + " already has an order for that time!");
        });

        AccommodationOrder accommodationOrder = AccommodationOrderFactory.create(request, patient);
        accommodationOrderRepository.save(accommodationOrder);
        return accommodationOrderMapper.modelToDto(accommodationOrder);
    }

    @Override
    public void deleteAccommodationOrder(String id){
        boolean accommodationOrderExists = accommodationOrderRepository.existsById(id);
        if(!accommodationOrderExists){
            throw new AccommodationOrderNotFoundException("Order with id: " + id + " doesn't exist.");
        }
        accommodationOrderRepository.deleteById(id);
    }

    @Override
    public AccommodationOrderDto updateAccommodationOrder(String id, UpdateAccommodationOrderRequest request) {
        AccommodationOrder accommodationOrder = accommodationOrderRepository.findById(id).orElseThrow(() -> new AccommodationOrderNotFoundException(id));

        if(request.getArrivalDateTime() != null){
            accommodationOrderRepository.findByPatientIdAndDateTimeRanges(
                    accommodationOrder.getPatient().getId(),
                    request.getArrivalDateTime(),
                    request.getDepartureDateTime()
            ).stream()
                    .findAny()
                    .ifPresent((order) -> {
                        if (!order.getId().equals(request.getId())) {
                            throw new IllegalArgumentException("Patient: " + order.getPatient()
                                    .getFirstName() + " already has an order for that time!");
                        }
            });

        }
        accommodationOrder.setArrivalDateTime(request.getArrivalDateTime());
        accommodationOrder.setDepartureDateTime(request.getDepartureDateTime());

        if(request.getAccommodationSize() > 0){
            accommodationOrder.setAccommodationSize(request.getAccommodationSize());
        }
        if (request.getAccommodationType() != null) {
            accommodationOrder.setAccommodationType(request.getAccommodationType());
        }

        if (request.getLatitude() != null && request.getLongitude() != null) {

            GeometryFactory geometryFactory = new GeometryFactory();
            Point newLocation = geometryFactory.createPoint(new Coordinate(
                    Double.parseDouble(request.getLatitude()), Double.parseDouble(request.getLongitude()))
            );
            accommodationOrder.setLocation(newLocation);
        }

        accommodationOrderRepository.save(accommodationOrder);
        return accommodationOrderMapper.modelToDto(accommodationOrder);
    }
}
