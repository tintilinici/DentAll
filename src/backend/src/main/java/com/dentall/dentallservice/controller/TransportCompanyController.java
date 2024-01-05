package com.dentall.dentallservice.controller;

import com.dentall.dentallservice.model.dto.TransportCompanyDto;
import com.dentall.dentallservice.model.request.CreateTransportCompanyRequest;
import com.dentall.dentallservice.service.TransportCompanyService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
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
    public ResponseEntity<List<TransportCompanyDto>> retrieveTransportCompanies(@RequestParam(required = false) String id) {
        if (id != null) {
            return ResponseEntity.ok(Collections.singletonList(service.retrieveTransportCompanyById(id)));
        } else {
            return ResponseEntity.ok(service.retrieveALlTransportCompanies());
        }
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<?> deleteTransportCompany(@RequestParam String id) {
        service.deleteTransportCompany(id);
        return ResponseEntity.ok("Successfully deleted!");
    }
}
