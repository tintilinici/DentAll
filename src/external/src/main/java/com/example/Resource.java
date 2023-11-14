package com.example;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/")
public class Resource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String fetchMedicalTreatments() {
        return "Hello RESTEasy";
    }
}
