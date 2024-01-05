package com.example.service;

import com.example.models.FetchMedicalTreatmentsRequest;
import com.example.models.MedicalTreatmentDto;
import jakarta.enterprise.context.ApplicationScoped;
import javafx.util.Pair;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import static com.example.common.TimeSplitter.END_TIME;
import static com.example.common.TimeSplitter.START_TIME;
import static com.example.common.TimeSplitter.splitFullTimeIntoParts;

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

        if (numOfTreatments > 0) {
            var appointments = getRandomAppointments(request.getArrivalDateTime(), request.getDepartureDateTime(), numOfTreatments);

            appointments.forEach(appointment -> {
                LocalDateTime appointmentStart = appointment.getKey();
                LocalDateTime appointmentEnd = appointment.getValue();
                String clinicAddress = "Clinic Address " + (int) (Math.random() * 10);
                String description = "Description " + (int) (Math.random() * 10);
                String id = UUID.randomUUID().toString();
                MedicalTreatmentDto treatment = new MedicalTreatmentDto(id, request.getPatientId(), description, clinicAddress, appointmentStart, appointmentEnd);
                treatments.add(treatment);
            });
        }

        return treatments;
    }

    private List<Pair<LocalDateTime, LocalDateTime>> getRandomAppointments(LocalDateTime arrivalDateTime, LocalDateTime departureDateTime, int numberOfTreatments) {
        List<Pair<LocalDateTime, LocalDateTime>> appointments = new ArrayList<>();

        List<Pair<LocalDateTime, LocalDateTime>> workdayParts = splitFullTimeIntoParts(arrivalDateTime, departureDateTime, numberOfTreatments);
        workdayParts.forEach(part -> {
            appointments.add(generateRandomAppointment(part.getKey(), part.getValue()));
        });

        return appointments;
    }

    private Pair<LocalDateTime, LocalDateTime> generateRandomAppointment(LocalDateTime partStartDateTime, LocalDateTime partEndDateTime) {
        LocalDateTime appointmentStartDateTime;
        LocalDateTime appointmentEndDateTime;
        LocalTime partStartTime = partStartDateTime.toLocalTime();
        LocalTime partEndTime = partEndDateTime.toLocalTime();

        if (partStartTime.isAfter(END_TIME.minusMinutes(15))) {
            appointmentStartDateTime = partStartDateTime.plusDays(1).with(START_TIME);
        } else if (partStartTime.isBefore(START_TIME)) {
            appointmentStartDateTime = partStartDateTime.with(START_TIME);
        } else {
            appointmentStartDateTime = partStartDateTime;
        }

        long duration;
        long minutesUntilEndOfWorkDay = Duration.between(partStartTime, END_TIME).toMinutes();
        long minutesUntilEndOfPart = Duration.between(partStartTime, partEndTime).toMinutes();
        long minutesUntilEnd = Math.min(minutesUntilEndOfWorkDay, minutesUntilEndOfPart);

        if (minutesUntilEnd < 120) {
            duration = (long) (Math.random() * minutesUntilEnd + 15);
        } else {
            duration = (long) (Math.random() * 105 + 15);
        }

        appointmentEndDateTime = appointmentStartDateTime.plusMinutes(duration);
        return new Pair<>(appointmentStartDateTime, appointmentEndDateTime);
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
