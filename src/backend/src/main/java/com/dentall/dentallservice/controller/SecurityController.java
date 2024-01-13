package com.dentall.dentallservice.controller;

import com.dentall.dentallservice.model.request.CreateAccountRequest;
import com.dentall.dentallservice.service.impl.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/security")
@CrossOrigin("*")
public class SecurityController {

    @Autowired
    private SecurityService securityService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody CreateAccountRequest request) {
        return securityService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestParam String email,
                                                     @RequestParam String password) {
        return securityService.login(email, password);
    }

    @PatchMapping("/update-roles")
    public ResponseEntity<Void> updateRoles(@RequestParam String email, @RequestBody String[] roles){
        return securityService.updateRoles(email, roles);
    }

}
