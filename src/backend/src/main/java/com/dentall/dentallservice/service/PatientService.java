package com.dentall.dentallservice.service;

import com.dentall.dentallservice.model.dto.AccommodationOrderDto;
import com.dentall.dentallservice.model.dto.PatientDto;
import com.dentall.dentallservice.model.request.CreateAccommodationOrderRequest;
import com.dentall.dentallservice.model.request.CreatePatientRequest;
import com.dentall.dentallservice.model.request.UpdateAccommodationOrderRequest;
import com.dentall.dentallservice.model.request.UpdatePatientRequest;

import java.util.List;

public interface PatientService {

    PatientDto createPatient(CreatePatientRequest request);

    void deletePatient(String id);

    PatientDto retrievePatient(String id);

    List<PatientDto> retrieveAllPatients();

    PatientDto updatePatient(String id, UpdatePatientRequest request);

    AccommodationOrderDto createAccommodationOrder(CreateAccommodationOrderRequest request);

    void deleteAccommodationOrder(String id);

    List<AccommodationOrderDto> searchAccommodationOrders(String patientId);

    AccommodationOrderDto updateAccommodationOrder(String id, UpdateAccommodationOrderRequest request);
}
