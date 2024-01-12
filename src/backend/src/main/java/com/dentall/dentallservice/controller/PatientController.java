package com.dentall.dentallservice.controller;

import com.dentall.dentallservice.model.dto.AccommodationOrderDto;
import com.dentall.dentallservice.model.dto.PatientDto;
import com.dentall.dentallservice.model.request.CreateAccommodationOrderRequest;
import com.dentall.dentallservice.model.request.CreatePatientRequest;
import com.dentall.dentallservice.model.request.UpdateAccommodationOrderRequest;
import com.dentall.dentallservice.model.request.UpdatePatientRequest;
import com.dentall.dentallservice.repository.AccommodationBookingRepository;
import com.dentall.dentallservice.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/patients")
@Tag(name = "Patient", description = "Patient API")
public class PatientController {

    @Autowired
    private PatientService service;

    @Autowired
    private AccommodationBookingRepository accommodationBookingRepository;

    @Operation(
            summary = "Retrieve a Patient",
            description = "Retrieves a Patient by it's Id."
    )
    @GetMapping("/{id}")
    public ResponseEntity<PatientDto> retrievePatient(@PathVariable("id") String id){
        return ResponseEntity.ok(service.retrievePatient(id));
    }

    @Operation(
            summary = "Retrieve all Patients",
            description = "Retrieves all Patients."
    )
    @GetMapping
    public ResponseEntity<List<PatientDto>> retrieveAllPatients(){
        return ResponseEntity.ok(service.retrieveAllPatients());
    }

    @Operation(
            summary = "Creates a Patient",
            description = "Creates a Patient. All params are required."
    )
    @PostMapping
    public ResponseEntity<PatientDto> createPatient(@RequestBody CreatePatientRequest request){
        return ResponseEntity.ok(service.createPatient(request));
    }

    @Operation(
            summary = "Delete a Patient",
            description = "Deletes a Patient by it's Id."
    )
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deletePatient(@PathVariable("id") String id){
        service.deletePatient(id);
        return ResponseEntity.ok("Successfully deleted");
    }

    @Operation(
            summary = "Update a Patient",
            description = "Updates a Patient by it's Id. All params are optional."
    )
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<PatientDto> updatePatient(
            @PathVariable("id") String id,
            @RequestBody UpdatePatientRequest request){
        return ResponseEntity.ok(service.updatePatient(id, request));
    }

    /*Now starts the Accommodation Order part of the controller.
    Based on the correlation with the patient
    these functionalities are not part of a separate controller.*/

    @Operation(
            summary = "Creates an AccommodationOrder",
            description = "Creates an AccommodationOrder. AccommodationType must be one of the following: " +
                    "'ROOM, 'HOUSE', 'APARTMENT'"
    )
    @PostMapping("/orders")
    public ResponseEntity<AccommodationOrderDto> createAccommodationOrder(@RequestBody CreateAccommodationOrderRequest request){
        return ResponseEntity.ok(service.createAccommodationOrder(request));
    }

    @Operation(
            summary = "Retrieve an AccommodationOrder",
            description = "Retrieves an AccommodationOrder by the Patient's id."
    )
    @GetMapping("/orders")
    public ResponseEntity<List<AccommodationOrderDto>> searchAccommodationOrders(@RequestParam String patientId) {
        return ResponseEntity.ok(service.searchAccommodationOrders(patientId));
    }

    @Operation(
            summary = "Delete an AccommodationOrder",
            description = "Deletes an AccommodationOrder by it's id."
    )
    @DeleteMapping("/orders/{id}")
    @Transactional
    public ResponseEntity<?> deleteAccommodationOrder(@PathVariable("id") String id){
        service.deleteAccommodationOrder(id);
        return ResponseEntity.ok("Successfully deleted");
    }

    @Operation(
            summary = "Update a AccommodationOrder",
            description = "Updates a AccommodationOrder by it's Id."
    )
    @PutMapping("orders/{id}")
    @Transactional
    public ResponseEntity<AccommodationOrderDto> updateAccommodationOrder(
            @PathVariable("id") String id,
            @RequestBody UpdateAccommodationOrderRequest request){
        if(accommodationBookingRepository.existsByOrderId(id)){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }else {
            return ResponseEntity.ok(service.updateAccommodationOrder(id, request));
        }

    }

}
