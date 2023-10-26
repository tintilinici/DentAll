package com.dentall.dentallservice.controller;

import com.dentall.dentallservice.model.dto.AccommodationBookingDto;
import com.dentall.dentallservice.model.dto.AccommodationDto;
import com.dentall.dentallservice.model.request.BookAccommodationRequest;
import com.dentall.dentallservice.model.request.CreateAccommodationRequest;
import com.dentall.dentallservice.model.request.SearchAccommodationBookingRequest;
import com.dentall.dentallservice.model.request.SearchAccommodationsRequest;
import com.dentall.dentallservice.service.AccommodationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//TODO add validation on request bodies

@RestController
@RequestMapping("/accommodations")
public class AccommodationController {

    @Autowired
    private AccommodationService service;

    @PostMapping
    public ResponseEntity<AccommodationDto> createAccommodation(@RequestBody CreateAccommodationRequest request) {
        return ResponseEntity.status(201).body(service.createAccommodation(request));
    }

    @GetMapping
    public ResponseEntity<List<AccommodationDto>> searchAccommodations(@RequestBody SearchAccommodationsRequest request) {
        var result = service.searchAccommodations(request);
        int status = result.isEmpty() ? 204 : 200;
        return ResponseEntity.status(status).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccommodationDto> retrieveAccommodation(@PathVariable("id") String id) {
        return ResponseEntity.ok(service.retrieveAccommodation(id));
    }

    @PostMapping("/bookings")
    public ResponseEntity<AccommodationBookingDto> bookAccommodation(@RequestBody BookAccommodationRequest request) {
        return ResponseEntity.ok(service.bookAccommodation(request));
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<AccommodationBookingDto>> searchAccommodationBookings(@RequestBody SearchAccommodationBookingRequest request) {
        //TODO add validation on request bodies
        var result = service.searchAccommodationBookings(request);
        int status = result.isEmpty() ? 204 : 200;
        return ResponseEntity.status(status).body(result);
    }

    @GetMapping("/bookings/{id}")
    public ResponseEntity<AccommodationBookingDto> retrieveAccommodationBooking(@PathVariable("id") String id) {
        return ResponseEntity.ok(service.retrieveAccommodationBooking(id));
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteAccommodation() {
        return null;
    }
}
