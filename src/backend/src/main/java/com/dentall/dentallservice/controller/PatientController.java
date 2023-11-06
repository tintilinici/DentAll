package com.dentall.dentallservice.controller;

import com.dentall.dentallservice.model.dto.AccommodationOrderDto;
import com.dentall.dentallservice.model.dto.PatientDto;
import com.dentall.dentallservice.model.request.CreateAccommodationOrderRequest;
import com.dentall.dentallservice.model.request.CreatePatientRequest;
import com.dentall.dentallservice.service.PatientService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientService service;


    @PostMapping
    public ResponseEntity<PatientDto> createPatient(@RequestBody CreatePatientRequest request){
        return ResponseEntity.status(201).body(service.createPatient(request));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deletePatient(@PathVariable("id") String id){
        service.deletePatient(id);
        return ResponseEntity.ok("Successfully deleted");
    }

    @PostMapping("/orders")
    public ResponseEntity<AccommodationOrderDto> createAccommodationOrder(@RequestBody CreateAccommodationOrderRequest request){
        return ResponseEntity.status(201).body(service.createAccommodationOrder(request));
    }

    @DeleteMapping("/orders/{id}")
    @Transactional
    public ResponseEntity<?> deleteAccommodationOrder(@PathVariable("id") String id){
        service.deleteAccommodationOrder(id);
        return ResponseEntity.ok("Successfully deleted");
    }

}
