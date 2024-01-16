package com.dentall.dentallservice.controller;

import com.dentall.dentallservice.model.dto.TransportCompanyDto;
import com.dentall.dentallservice.model.request.CreateTransportCompanyRequest;
import com.dentall.dentallservice.model.request.UpdateTransportCompanyRequest;
import com.dentall.dentallservice.service.TransportCompanyService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/transportCompanies")
@Tag(name = "Transport Company", description = "Transport Company API")
public class TransportCompanyController {

    @Autowired
    private TransportCompanyService service;

    @PostMapping
    public ResponseEntity<TransportCompanyDto> createTransportCompany(@RequestBody CreateTransportCompanyRequest request) {
        return ResponseEntity.ok(service.createTransportCompany(request));
    }

    @GetMapping
    public ResponseEntity<List<TransportCompanyDto>> retrieveTransportCompanies() {
        return ResponseEntity.ok(service.retrieveALlTransportCompanies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransportCompanyDto> retrieveTransportCompany(@PathVariable("id") String id) {
        return ResponseEntity.ok(service.retrieveTransportCompanyById(id));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deleteTransportCompany(@PathVariable("id") String id) {
        service.deleteTransportCompany(id);
        return ResponseEntity.ok("Successfully deleted!");
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> updateTransportCompany(
            @PathVariable("id") String id,
            @RequestBody UpdateTransportCompanyRequest request
    ) {

        return ResponseEntity.ok(service.updateTransportCompany(id, request));
    }

//    @PostMapping("/{id}/assign-vehicles")
//    public ResponseEntity<TransportCompanyDto> assignTransportVehicles(
//            @PathVariable("id") String id,
//            @RequestBody List<String> vehiclesIds
//    ) {
//        return ResponseEntity.ok(service.assignVehicles(id, vehiclesIds));
//    }
}
