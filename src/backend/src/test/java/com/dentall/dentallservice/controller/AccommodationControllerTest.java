package com.dentall.dentallservice.controller;

import com.dentall.dentallservice.DentAllServiceApplication;
import com.dentall.dentallservice.config.TestWebConfig;
import com.dentall.dentallservice.exception.ExceptionResponse;
import com.dentall.dentallservice.model.domain.Accommodation;
import com.dentall.dentallservice.model.domain.AccommodationType;
import com.dentall.dentallservice.model.domain.SecurityRole;
import com.dentall.dentallservice.model.domain.SecurityUser;
import com.dentall.dentallservice.model.dto.AccommodationDto;
import com.dentall.dentallservice.model.request.CreateAccommodationRequest;
import com.dentall.dentallservice.model.request.UpdateAccommodationRequest;
import com.dentall.dentallservice.repository.AccommodationRepository;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
@Import(TestWebConfig.class)
class AccommodationControllerTest {

    @LocalServerPort
    private int port;

    @MockBean
    private AuthenticationManager authenticationManager;

    @Autowired
    @MockBean
    private AccommodationRepository accommodationRepository;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        Mockito.when(authenticationManager.authenticate(Mockito.any()))
                .thenReturn(new TestingAuthenticationToken("admin", "password", "ACCOMMODATION", "TRANSPORT", "PATIENT"));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ACCOMMODATION", "TRANSPORT", "PATIENT"})
    void testCreateAccommodation() {
        CreateAccommodationRequest request = new CreateAccommodationRequest();
        request.setAddress(UUID.randomUUID().toString());
        request.setLatitude("45");
        request.setLongitude("15");
        request.setAccommodationType("ROOM");
        request.setAddress(UUID.randomUUID().toString());
        request.setAvailabilityEnd(LocalDate.of(2021, 12, 31));
        request.setAvailabilityEnd(LocalDate.of(2022, 12, 31));

        Response response = given()
                .contentType("application/json")
                .body(request)
                .when()
                .post("/accommodations")
                .then()
                .statusCode(200)
                .extract()
                .response();

        AccommodationDto dtoResponse = response.as(AccommodationDto.class);
        assertEquals(request.getAccommodationType(), dtoResponse.getAccommodationType().toString());
        assertEquals(request.getAddress(), dtoResponse.getAddress());
        assertEquals(request.getLatitude() + ".0", dtoResponse.getLatitude());
        assertEquals(request.getLongitude() + ".0", dtoResponse.getLongitude());
        assertEquals(request.getAvailabilityStart(), dtoResponse.getAvailabilityStart());
        assertEquals(request.getAvailabilityEnd(), dtoResponse.getAvailabilityEnd());

        ArgumentCaptor<Accommodation> captor = ArgumentCaptor.forClass(Accommodation.class);
        Mockito.verify(accommodationRepository).save(captor.capture());
        Accommodation accommodation = captor.getValue();

        assertEquals(request.getAccommodationType(), accommodation.getAccommodationType().toString());
        assertEquals(request.getAddress(), accommodation.getAddress());
        assertEquals(request.getLatitude() + ".0", String.valueOf(accommodation.getLocation().getY()));
        assertEquals(request.getLongitude() + ".0", String.valueOf(accommodation.getLocation().getX()));
        assertEquals(request.getAvailabilityStart(), accommodation.getAvailabilityStart());
        assertEquals(request.getAvailabilityEnd(), accommodation.getAvailabilityEnd());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ACCOMMODATION", "TRANSPORT", "PATIENT"})
    void testDeleteAccommodation_whenExists() {
        String id = UUID.randomUUID().toString();
        Mockito.when(accommodationRepository.existsById(id)).thenReturn(true);

        Response response = given()
                .contentType("application/json")
                .when()
                .delete("/accommodations/" + id)
                .then()
                .statusCode(200)
                .extract()
                .response();

        assertEquals("Successfully deleted", response.asString());

        Mockito.verify(accommodationRepository).deleteById(id);
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ACCOMMODATION", "TRANSPORT", "PATIENT"})
    void testDeleteAccommodation_whenDoesNotExist_shouldThrow() {
        String id = UUID.randomUUID().toString();
        Mockito.when(accommodationRepository.existsById(id)).thenReturn(false);

        Response response = given()
                .contentType("application/json")
                .when()
                .delete("/accommodations/" + id)
                .then()
                .statusCode(400)
                .extract()
                .response();

        ExceptionResponse exceptionResponse = response.as(ExceptionResponse.class);

        assertEquals("Accommodation with id: '" + id + "' not found!", exceptionResponse.getMessage());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ACCOMMODATION", "TRANSPORT", "PATIENT"})
    void testUpdateAccommodation_whenDoesExist() {
        String id = UUID.randomUUID().toString();
        UpdateAccommodationRequest request = UpdateAccommodationRequest.builder()
                .accommodationType(AccommodationType.APARTMENT)
                .address(UUID.randomUUID().toString())
                .availabilityStart(LocalDate.of(2021, 12, 31))
                .availabilityEnd(LocalDate.of(2022, 12, 31))
                .build();

        Mockito.when(accommodationRepository.findById(id)).thenReturn(Optional.of(Accommodation.builder()
                .id(id)
                .accommodationType(AccommodationType.ROOM)
                .address(UUID.randomUUID().toString())
                .availabilityStart(LocalDate.of(2021, 1, 1))
                .availabilityEnd(LocalDate.of(2021, 1, 31))
                .location(toPoint("15", "45"))
                .build()));

        Response response = given()
                .contentType("application/json")
                .body(request)
                .when()
                .put("/accommodations/" + id)
                .then()
                .statusCode(200)
                .extract()
                .response();

        AccommodationDto dtoResponse = response.as(AccommodationDto.class);

        assertEquals(request.getAccommodationType().toString(), dtoResponse.getAccommodationType().toString());
        assertEquals(request.getAddress(), dtoResponse.getAddress());
        assertEquals(request.getAvailabilityStart(), dtoResponse.getAvailabilityStart());
        assertEquals(request.getAvailabilityEnd(), dtoResponse.getAvailabilityEnd());

        Mockito.verify(accommodationRepository).findById(id);

        ArgumentCaptor<Accommodation> captor = ArgumentCaptor.forClass(Accommodation.class);

        Mockito.verify(accommodationRepository).save(captor.capture());
        Accommodation accommodation = captor.getValue();

        assertEquals(request.getAccommodationType().toString(), accommodation.getAccommodationType().toString());
        assertEquals(request.getAddress(), accommodation.getAddress());
        assertEquals(request.getAvailabilityStart(), accommodation.getAvailabilityStart());
        assertEquals(request.getAvailabilityEnd(), accommodation.getAvailabilityEnd());
    }

    private static Point toPoint(String longitude, String latitude) {
        GeometryFactory geometryFactory = new GeometryFactory();
        return geometryFactory.createPoint(new Coordinate(Double.parseDouble(longitude), Double.parseDouble(latitude)));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ACCOMMODATION", "TRANSPORT", "PATIENT"})
    void testUpdateAccommodation_whenDoesNotExist_shouldThrow() {
        String id = UUID.randomUUID().toString();
        UpdateAccommodationRequest request = UpdateAccommodationRequest.builder()
                .accommodationType(AccommodationType.APARTMENT)
                .address(UUID.randomUUID().toString())
                .availabilityStart(LocalDate.of(2021, 12, 31))
                .availabilityEnd(LocalDate.of(2022, 12, 31))
                .build();

        Mockito.when(accommodationRepository.existsById(id)).thenReturn(false);

        Response response = given()
                .contentType("application/json")
                .body(request)
                .when()
                .put("/accommodations/" + id)
                .then()
                .statusCode(400)
                .extract()
                .response();

        ExceptionResponse exceptionResponse = response.as(ExceptionResponse.class);

        assertEquals("Accommodation with id: '" + id + "' not found!", exceptionResponse.getMessage());
    }
}