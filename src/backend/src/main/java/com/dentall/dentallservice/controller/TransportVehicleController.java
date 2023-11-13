package com.dentall.dentallservice.controller;

import com.dentall.dentallservice.model.dto.TransportVehicleDto;
import com.dentall.dentallservice.model.request.CreateTransportVehicleRequest;
import com.dentall.dentallservice.service.TransportVehicleService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transportVehicles")
public class TransportVehicleController {

    @Autowired
    private TransportVehicleService service;

    @PostMapping
    public ResponseEntity<TransportVehicleDto> createTransportVehicle(@RequestBody CreateTransportVehicleRequest request){
        return ResponseEntity.status(201).body(service.createTransportVehicle(request));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deleteTransportVehicle(@PathVariable("id") String id){
        //TODO FORBID DELETING IF IT IS IN TRANSPORT PROCESS (WHEN TransportBooking IS IMPLEMENTED)
        service.deleteTransportVehicle(id);
        return ResponseEntity.ok("Successfully deleted");
    }
}
