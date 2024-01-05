package com.dentall.dentallservice.controller;

import com.dentall.dentallservice.model.dto.AccommodationDto;
import com.dentall.dentallservice.model.request.CreateAccommodationRequest;
import com.dentall.dentallservice.model.request.SearchAccommodationsRequest;
import com.dentall.dentallservice.model.request.UpdateAccommodationRequest;
import com.dentall.dentallservice.service.AccommodationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/accommodations")
@Tag(name = "Accommodation", description = "Accommodation API")
public class AccommodationController {

    @Autowired
    private AccommodationService service;

    @Operation(
            summary = "Create an Accommodation",
            description = "Creates an Accommodation. All params are required."
    )
    @PostMapping
    public ResponseEntity<AccommodationDto> createAccommodation(@RequestBody CreateAccommodationRequest request) {
        return ResponseEntity.status(201).body(service.createAccommodation(request));
    }

    @Operation(
            summary = "Retrieve Accommodations",
            description = "Retrieve all Accommodations around a given point. (10km radius)"
    )
    @GetMapping
    public ResponseEntity<List<AccommodationDto>> searchAccommodations(
            @RequestParam(required = false) String latitude,
            @RequestParam(required = false) String longitude
    ) {
        var result = service.searchAccommodations(latitude, longitude);
        int status = result.isEmpty() ? 204 : 200;
        return ResponseEntity.status(status).body(result);
    }

    @Operation(
            summary = "Retrieve an Accommodation",
            description = "Retrieves an Accommodation by it's id."
    )
    @GetMapping("/{id}")
    public ResponseEntity<AccommodationDto> retrieveAccommodation(@PathVariable("id") String id) {
        return ResponseEntity.ok(service.retrieveAccommodation(id));
    }

    @Operation(
            summary = "Retrieve all Accommodations",
            description = "Retrieves all Accommodations."
    )
    @GetMapping
    public ResponseEntity<List<AccommodationDto>> retrieveAccommodations() {
        return ResponseEntity.ok(service.createAccommodations());
    }

    @Operation(
            summary = "Delete an Accommodation",
            description = "Deletes and Accommodation by it's id."
    )
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deleteAccommodation(@PathVariable("id") String id) {
        service.deleteAccommodation(id);
        return ResponseEntity.ok("Successfully deleted");
    }

    @Operation(
            summary = "Update an Accommodation",
            description = "Updates an Accommodation by it's id. All params are optional."
    )
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<AccommodationDto> updateAccommodation(
            @PathVariable("id") String id,
            @RequestBody UpdateAccommodationRequest request
    ) {
        return ResponseEntity.ok(service.updateAccommodation(id, request));
    }
}
