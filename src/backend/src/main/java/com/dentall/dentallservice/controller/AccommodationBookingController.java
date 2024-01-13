package com.dentall.dentallservice.controller;

import com.dentall.dentallservice.model.dto.AccommodationBookingDto;
import com.dentall.dentallservice.model.request.CreateAccommodationBookingRequest;
import com.dentall.dentallservice.service.AccommodationBookingService;
import com.dentall.dentallservice.service.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/bookings")
@Tag(name = "Accommodation Booking", description = "Accommodation Booking API")
public class AccommodationBookingController {

    @Autowired
    private AccommodationBookingService service;

    @Autowired
    private EmailService emailService;

    @Operation(
            summary = "Create an AccommodationBooking",
            description = "Books an accommodation for a specific AccommodationOrder if there are Accommodations that " +
                    "match the AccommodationOrder criteria in a circle of 10km around the provided point."
    )
    @PostMapping
    public ResponseEntity<AccommodationBookingDto> createAccommodationBooking(@RequestBody CreateAccommodationBookingRequest request) {
        return ResponseEntity.ok(service.createAccommodationBooking(request));
    }

    @Operation(
            summary = "Retrieve AccommodationBookings",
            description = "Retrieve AccommodationBookings either by Accommodation's id or by Patient's id. " +
                    "If both are provided search will be done by Patient's id and Accommodation's id will be ignored."
    )
    @GetMapping
    public ResponseEntity<List<AccommodationBookingDto>> retrieveAccommodationBookings(
            @RequestParam(required = false) String accommodationId,
            @RequestParam(required = false) String patientId
    ) {
        return ResponseEntity.ok(service.retrieveAccommodationBookings(accommodationId, patientId));
    }

    @Operation(
            summary = "Retrieve AccommodationBookings by id",
            description = "Retrieve an AccommodationBooking by it's id."
    )
    @GetMapping("/{id}")
    public ResponseEntity<AccommodationBookingDto> retrieveAccommodationBooking(@PathVariable("id") String id) {
        return ResponseEntity.ok(service.retrieveAccommodationBooking(id));
    }

    @Operation(
            summary = "Delete AccommodationBooking",
            description = "Delete an AccommodationBooking by it's id."
    )
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deleteAccommodationBooking(@PathVariable("id") String id) {
        service.deleteAccommodationBooking(id);
        return ResponseEntity.ok("Booking successfully deleted!");
    }

    @GetMapping("/testMail")
    public ResponseEntity<?> testMail() {
        emailService.sendBookingEmailToDriver("asd", "rokorokic@gmail.com",
                "0915601017", "Clinic address1", "accommodation address 1");
        return ResponseEntity.ok("Sent!");
    }

    @Operation(
            summary = "Delete AccommodationBooking either by the Accommodation's id",
            description = "Delete AccommodationBookings either by Accommodation's id or by Patient's id and " +
                    "the booking's start date"
    )
    @DeleteMapping
    @Transactional
    public ResponseEntity<?> deleteAccommodationBooking(
            @RequestParam(required = false) String accommodationId,
            @RequestParam(required = false) String patientId,
            @RequestParam(required = false) LocalDate startDate
            ) {
        if (accommodationId != null) {
            service.deleteAccommodationBookingByAccommodationId(accommodationId);
        } else {
            service.deleteAccommodationBooking(patientId, startDate);
        }
        return ResponseEntity.ok("Bookings successfully deleted!");
    }
}
