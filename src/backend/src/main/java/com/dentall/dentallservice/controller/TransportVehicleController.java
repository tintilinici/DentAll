package com.dentall.dentallservice.controller;

import com.dentall.dentallservice.model.dto.TransportVehicleDto;
import com.dentall.dentallservice.model.request.CreateTransportVehicleRequest;
import com.dentall.dentallservice.service.EmailService;
import com.dentall.dentallservice.service.TransportVehicleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/transportVehicles")
@Tag(name = "Transport Vehicle", description = "Transport Vehicle API")
public class TransportVehicleController {

    @Autowired
    private TransportVehicleService service;

    @Autowired
    private EmailService emailService;

    @Operation(
            summary = "Creates a TransportVehicle",
            description = "Creates a TransportVehicle. All params are required."
    )
    @PostMapping
    public ResponseEntity<TransportVehicleDto> createTransportVehicle(@RequestBody CreateTransportVehicleRequest request){
        return ResponseEntity.ok(service.createTransportVehicle(request));
    }

    @Operation(
            summary = "Deletes a TransportVehicle",
            description = "Deletes a TransportVehicle by it's id."
    )
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deleteTransportVehicle(@PathVariable("id") String id){
        //TODO FORBID DELETING IF IT IS IN TRANSPORT PROCESS (WHEN TransportBooking IS IMPLEMENTED)
        service.deleteTransportVehicle(id);
        return ResponseEntity.ok("Successfully deleted");
    }

    @GetMapping
    public ResponseEntity<List<TransportVehicleDto>> retrieveTransportVehicles() {
        return ResponseEntity.ok(service.retrieveAllTransportVehicles());
    }

    @GetMapping("/{id}")
    ResponseEntity<TransportVehicleDto> retrieveTransportVehicle(@PathVariable("id") String id) {
        return ResponseEntity.ok(service.retrieveTransportVehicleById(id));
    }


    @GetMapping("/testMail")
    public ResponseEntity<?> testMail() {
        emailService.sendBookingEmailToPatient("your@driver.com","rokorokic@gmail.com",
                "Clinic address1", "accommodation address 1", "Filip Buljan");
        return ResponseEntity.ok("Sent!");
    }
}
