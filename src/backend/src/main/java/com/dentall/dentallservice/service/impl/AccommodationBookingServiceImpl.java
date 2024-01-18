package com.dentall.dentallservice.service.impl;

import com.dentall.dentallservice.exception.exceptions.AccommodationBookingNotFoundException;
import com.dentall.dentallservice.exception.exceptions.AccommodationNotFound;
import com.dentall.dentallservice.exception.exceptions.NoBookingAvailableException;
import com.dentall.dentallservice.exception.exceptions.PatientNotFoundException;
import com.dentall.dentallservice.factory.AccommodationBookingFactory;
import com.dentall.dentallservice.mapper.AccommodationBookingMapper;
import com.dentall.dentallservice.model.domain.Accommodation;
import com.dentall.dentallservice.model.domain.AccommodationBooking;
import com.dentall.dentallservice.model.domain.AccommodationOrder;
import com.dentall.dentallservice.model.domain.AccommodationType;
import com.dentall.dentallservice.model.domain.Patient;
import com.dentall.dentallservice.model.domain.QAccommodation;
import com.dentall.dentallservice.model.domain.QAccommodationBooking;
import com.dentall.dentallservice.model.dto.AccommodationBookingDto;
import com.dentall.dentallservice.model.request.CreateAccommodationBookingRequest;
import com.dentall.dentallservice.repository.AccommodationBookingRepository;
import com.dentall.dentallservice.repository.AccommodationOrderRepository;
import com.dentall.dentallservice.repository.AccommodationRepository;
import com.dentall.dentallservice.repository.PatientRepository;
import com.dentall.dentallservice.service.AccommodationBookingService;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class AccommodationBookingServiceImpl implements AccommodationBookingService {

    @Autowired
    private AccommodationBookingMapper accommodationBookingMapper;

    @Autowired
    private AccommodationRepository accommodationRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AccommodationBookingRepository accommodationBookingRepository;

    @Autowired
    private AccommodationOrderRepository accommodationOrderRepository;

    private final double RADIUS = 1000000;

    @Override
    public AccommodationBookingDto createAccommodationBooking(CreateAccommodationBookingRequest request) {
        AccommodationOrder order = accommodationOrderRepository.findById(request.getAccommodationOrderId())
                .orElseThrow(() -> new IllegalArgumentException("Accommodation Order with id: '" + request.getAccommodationOrderId() + "' not found!"));

        if (order.getAccommodationBooking() != null) {
            throw new IllegalArgumentException("This Order already has an accommodation booking!");
        }

        Patient patient = patientRepository.findById(order.getPatient().getId())
                .orElseThrow(() -> new PatientNotFoundException("Patient with id: '" + order.getPatient().getId() + "' not found!"));


        Accommodation accommodation = accommodationRepository.findById(request.getAccommodationId())
                .orElseThrow(() -> new IllegalArgumentException("Accommodation with id: '" + request.getAccommodationId() +"' not found!"));

        AccommodationBooking booking = AccommodationBookingFactory.create(order, accommodation);
        order.setAccommodationBooking(booking);
        accommodationBookingRepository.save(booking);
        accommodationOrderRepository.save(order);

        return accommodationBookingMapper.modelToDto(booking);
    }

    @Override
    public List<AccommodationBookingDto> retrieveAccommodationBookings(String accommodationId, String patientId) {
        List<AccommodationBooking> bookings;
        if (patientId != null) {
            bookings = accommodationBookingRepository.findByOrderPatientId(patientId);
        } else {
            bookings = accommodationBookingRepository.findByAccommodationId(accommodationId);
        }

        return accommodationBookingMapper.modelsToDtos(bookings);
    }

    @Override
    public AccommodationBookingDto retrieveAccommodationBooking(String id) {
        AccommodationBooking booking = accommodationBookingRepository.findById(id)
                .orElseThrow(() -> new AccommodationBookingNotFoundException("id"));

        return accommodationBookingMapper.modelToDto(booking);
    }


    @Override
    public void deleteAccommodationBooking(String id) {
        checkIfBookingExists(id);
        accommodationBookingRepository.deleteById(id);
    }

    @Override
    public void deleteAccommodationBookingByAccommodationId(String id) {
        checkIfAccommodationExists(id);
        accommodationBookingRepository.deleteByAccommodationId(id);
    }

    @Override
    public void deleteAccommodationBooking(String patientId, LocalDate startDate) {
        checkIfPatientExists(patientId);
        LocalDateTime dateTimeStart = startDate.atStartOfDay();
        LocalDateTime dateTimeEnd = startDate.plusDays(1).atStartOfDay().minusSeconds(1);
        accommodationBookingRepository.deleteByOrderPatientIdAndOrderArrivalDateTimeBetween(patientId, dateTimeStart, dateTimeEnd);
    }

    private void checkIfPatientExists(String id) {
        boolean exists = patientRepository.existsById(id);
        if (!exists) {
            throw new PatientNotFoundException(id);
        }
    }

    private void checkIfAccommodationExists(String id) {
        boolean exists = accommodationRepository.existsById(id);
        if (!exists) {
            throw new AccommodationNotFound(id);
        }
    }

    private void checkIfBookingExists(String id) {
        boolean exists = accommodationBookingRepository.existsById(id);
        if (!exists) {
            throw new AccommodationBookingNotFoundException(id);
        }
    }
}
