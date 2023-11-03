package com.dentall.dentallservice.service.impl;

import com.dentall.dentallservice.exception.exceptions.PatientNotFoundException;
import com.dentall.dentallservice.mapper.PatientMapper;
import com.dentall.dentallservice.model.domain.Patient;
import com.dentall.dentallservice.model.dto.PatientDto;
import com.dentall.dentallservice.model.request.CreatePatientRequest;
import com.dentall.dentallservice.repository.PatientRepository;
import com.dentall.dentallservice.service.PatientService;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientMapper patientMapper;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private EntityManager entityManager;

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
}
