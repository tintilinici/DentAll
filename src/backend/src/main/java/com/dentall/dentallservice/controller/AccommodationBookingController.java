package com.dentall.dentallservice.controller;

import com.dentall.dentallservice.model.dto.AccommodationBookingDto;
import com.dentall.dentallservice.model.request.BookAccommodationRequest;
import com.dentall.dentallservice.model.request.DeleteAccommodationBookingRequest;
import com.dentall.dentallservice.model.request.SearchAccommodationBookingRequest;
import com.dentall.dentallservice.service.AccommodationBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class AccommodationBookingController {

    @Autowired
    private AccommodationBookingService service;

    @PostMapping
    public ResponseEntity<AccommodationBookingDto> bookAccommodation(@RequestBody BookAccommodationRequest request) {
        return ResponseEntity.ok(service.bookAccommodation(request));
    }

    @GetMapping
    public ResponseEntity<List<AccommodationBookingDto>> searchAccommodationBookings(
            @RequestParam(required = false) String accommodationId,
            @RequestParam(required = false) String patientId
    ) {
        var result = service.searchAccommodationBookings(accommodationId, patientId);
        int status = result.isEmpty() ? 204 : 200;
        return ResponseEntity.status(status).body(result);
    }

    @GetMapping("/bookings/{id}")
    public ResponseEntity<AccommodationBookingDto> retrieveAccommodationBooking(@PathVariable("id") String id) {
        return ResponseEntity.ok(service.retrieveAccommodationBooking(id));
    }


    @DeleteMapping("/bookings/{id}")
    @Transactional
    public ResponseEntity<?> deleteAccommodationBooking(@PathVariable("id") String id) {
        service.deleteAccommodationBooking(id);
        return ResponseEntity.ok("Booking successfully deleted!");
    }

    @DeleteMapping("/bookings")
    @Transactional
    public ResponseEntity<?> deleteAccommodationBookingByAccommodationId(@RequestParam String id) {
        service.deleteAccommodationBookingByAccommodationId(id);
        return ResponseEntity.ok("Bookings successfully deleted!");
    }

    @DeleteMapping("/bookings")
    @Transactional
    public ResponseEntity<?> deleteAccommodationBooking(@RequestBody DeleteAccommodationBookingRequest request) {
        service.deleteAccommodationBooking(request);
        return ResponseEntity.ok("Bookings successfully deleted!");
    }
}
