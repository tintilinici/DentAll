package com.dentall.dentallservice.scheduler;

import com.dentall.dentallservice.model.domain.AccommodationOrder;
import com.dentall.dentallservice.model.domain.MedicalTreatment;
import com.dentall.dentallservice.model.dto.MedicalTreatmentDto;
import com.dentall.dentallservice.model.request.FetchMedicalTreatmentsRequest;
import com.dentall.dentallservice.repository.AccommodationOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class MedicalAppointmentScheduler {

    @Autowired
    private AccommodationOrderRepository accommodationOrderRepository;

    @Autowired
    private WebClient webClient;

    @Scheduled(fixedRate = 1000)
    public void fetchMedicalAppointments() {
        var accommodationOrderList = accommodationOrderRepository.
                findByArrivalDateTimeAfterAndMedicalTreatmentsIsNull(LocalDateTime.now());

        List<FetchMedicalTreatmentsRequest> requests = new ArrayList<>();

        accommodationOrderList.forEach(order -> {
            var request = FetchMedicalTreatmentsRequest.builder()
                    .arrivalDateTime(order.getArrivalDateTime())
                    .departureDateTime(order.getDepartureDateTime())
                    .patientId(order.getPatient().getId())
                    .build();

            requests.add(request);
        });

        if (!requests.isEmpty()) {
            Mono<List<MedicalTreatmentDto>> response = webClient.post()
                    .bodyValue(requests)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<>() {});

            response.subscribe(
                    result -> {
                        System.out.println(result);
                    },
                    error -> {
                        System.out.println(error);
                    }
            );
        }
    }
}
