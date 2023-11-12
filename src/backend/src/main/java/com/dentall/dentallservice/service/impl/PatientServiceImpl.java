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
import com.dentall.dentallservice.repository.AccommodationOrderRepository;
import com.dentall.dentallservice.repository.PatientRepository;
import com.dentall.dentallservice.service.PatientService;
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
    public void deletePatient(String id) {
        boolean patientExists = patientRepository.existsById(id);
        if(!patientExists){
            throw new PatientNotFoundException("Patient with id: " + id + "doesn't exits.");
        }
        patientRepository.deleteById(id);
    }

    @Override
    public PatientDto retrievePatient(String id){
        Patient patient = patientRepository.findById(id).orElseThrow(() -> new PatientNotFoundException("Patient with id: '" + id + "' not found!"));

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
    };
}
