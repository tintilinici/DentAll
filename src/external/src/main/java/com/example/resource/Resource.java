package com.example.resource;

import com.example.models.FetchMedicalTreatmentsRequest;
import com.example.service.Service;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/")
public class Resource {

    @Inject
    Service service;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response fetchMedicalTreatments(List<FetchMedicalTreatmentsRequest> request) {
        return Response.ok(service.fetchMedicalTreatments(request)).build();
    }
}
