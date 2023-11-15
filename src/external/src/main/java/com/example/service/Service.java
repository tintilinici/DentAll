package com.example.service;

import com.example.models.FetchMedicalTreatmentsRequest;
import com.example.models.MedicalTreatmentDto;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@ApplicationScoped
public class Service {

    private static final Random random = new Random();

    public List<MedicalTreatmentDto> fetchMedicalTreatments(List<FetchMedicalTreatmentsRequest> request) {
        List<MedicalTreatmentDto> treatments = new ArrayList<>();
        request.forEach(req -> treatments.addAll(generateTreatmentsRandomly(req)));
        return treatments;
    }

    private List<MedicalTreatmentDto> generateTreatmentsRandomly(FetchMedicalTreatmentsRequest request) {
        List<MedicalTreatmentDto> treatments = new ArrayList<>();

        int numOfTreatments = generateNumber();
        for (int i = 0; i < numOfTreatments; i++) {
            LocalDateTime startDateTime = getRandomDateTime(request.getArrivalDateTime(), request.getDepartureDateTime());
            LocalDateTime endDateTime = getRandomDateTime(startDateTime, request.getDepartureDateTime());
            String clinicAddress = "Clinic Address " + (int) (Math.random() * 10);
            String description = "Description " + (int) (Math.random() * 10);
            String id = UUID.randomUUID().toString();
            MedicalTreatmentDto treatment = new MedicalTreatmentDto(id, request.getPatientId(), description, clinicAddress, startDateTime, endDateTime);
            treatments.add(treatment);
        }

        return treatments;
    }

    public static LocalDateTime getRandomDateTime(LocalDateTime arrivalDateTime, LocalDateTime departureDateTime) {
        // Define the time constraints
        LocalTime startTime = LocalTime.of(8, 0); // 8 AM
        LocalTime endTime = LocalTime.of(18, 0); // 6 PM

        // Adjust arrival and departure times to fit within the constraints
        LocalDateTime adjustedArrival = arrivalDateTime.toLocalTime().isBefore(startTime) ? arrivalDateTime.with(startTime) : arrivalDateTime;
        LocalDateTime adjustedDeparture = departureDateTime.toLocalTime().isAfter(endTime) ? departureDateTime.with(endTime) : departureDateTime;

        // Calculate the duration in minutes between the adjusted times
        long durationMinutes = java.time.Duration.between(adjustedArrival, adjustedDeparture).toMinutes();

        // Generate a random offset in minutes
        long randomOffsetMinutes = (long) (random.nextDouble() * durationMinutes);

        // Add the random offset to the adjusted arrival time
        return adjustedArrival.plusMinutes(randomOffsetMinutes);
    }

    private static int generateNumber() {

        int randomNumber = random.nextInt(100);

        if (randomNumber < 80) {
            return 0;
        } else if (randomNumber < 90) {
            return 1;
        } else {
            return 2;
        }
    }
}
