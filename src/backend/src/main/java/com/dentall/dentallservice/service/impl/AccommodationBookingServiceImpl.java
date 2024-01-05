package com.dentall.dentallservice.service.impl;

import com.dentall.dentallservice.exception.exceptions.AccommodationBookingNotFoundException;
import com.dentall.dentallservice.exception.exceptions.AccommodationNotFound;
import com.dentall.dentallservice.exception.exceptions.NoBookingAvailableException;
import com.dentall.dentallservice.exception.exceptions.PatientNotFoundException;
import com.dentall.dentallservice.factory.AccommodationBookingFactory;
import com.dentall.dentallservice.mapper.AccommodationBookingMapper;
import com.dentall.dentallservice.model.domain.Accommodation;
import com.dentall.dentallservice.model.domain.AccommodationBooking;
import com.dentall.dentallservice.model.domain.AccommodationType;
import com.dentall.dentallservice.model.domain.Patient;
import com.dentall.dentallservice.model.domain.QAccommodation;
import com.dentall.dentallservice.model.domain.QAccommodationBooking;
import com.dentall.dentallservice.model.dto.AccommodationBookingDto;
import com.dentall.dentallservice.model.request.BookAccommodationRequest;
import com.dentall.dentallservice.model.request.DeleteAccommodationBookingRequest;
import com.dentall.dentallservice.model.request.SearchAccommodationBookingRequest;
import com.dentall.dentallservice.repository.AccommodationBookingRepository;
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

    private final double RADIUS = 1000000;

    @Override
    public AccommodationBookingDto bookAccommodation(BookAccommodationRequest request) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new PatientNotFoundException("Patient with id: '" + request.getPatientId() + "' not found!"));

        BooleanBuilder builder = constructBookingRequestWhereClause(request);

        Iterable<Accommodation> accommodationIterable = accommodationRepository.findAll(builder);
        Accommodation accommodation = StreamSupport.stream(accommodationIterable.spliterator(), false)
                .findFirst()
                .orElseThrow(NoBookingAvailableException::new);

        AccommodationBooking booking = AccommodationBookingFactory.create(request, patient, accommodation);

        accommodationBookingRepository.save(booking);

        return accommodationBookingMapper.modelToDto(booking);
    }

    @Override
    public List<AccommodationBookingDto> searchAccommodationBookings(String accommodationId, String patientId) {
        List<AccommodationBooking> bookings;
        if (patientId != null) {
            bookings = accommodationBookingRepository.findByPatientId(patientId);
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
    public void deleteAccommodationBooking(DeleteAccommodationBookingRequest request) {
        checkIfPatientExists(request.getPatientId());
        LocalDateTime dateTimeStart = request.getStartDate().atStartOfDay();
        LocalDateTime dateTimeEnd = request.getStartDate().plusDays(1).atStartOfDay().minusSeconds(1);
        accommodationBookingRepository.deleteByPatientIdAndStartDateBetween(request.getPatientId(), dateTimeStart, dateTimeEnd);
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

    private BooleanBuilder constructBookingRequestWhereClause(BookAccommodationRequest request) {
        QAccommodation qAccommodation = QAccommodation.accommodation;

        BooleanBuilder whereClause = new BooleanBuilder();

        if (request.getLongitude() != null && request.getLatitude() != null) {
            String template = "ST_DistanceSphere({0}, ST_MakePoint({1}, {2}))";
            NumberExpression<Double> distanceExpression = Expressions.numberTemplate(Double.class, template,
                    qAccommodation.location, Expressions.constant(Double.parseDouble(request.getLongitude())), Expressions.constant(Double.parseDouble(request.getLatitude())));
            whereClause.and(distanceExpression.loe(RADIUS));
        }


        if (request.getAccommodationType() != null) {
            whereClause.and(qAccommodation.accommodationType.eq(AccommodationType.valueOf(request.getAccommodationType())));
        }

        whereClause.and(qAccommodation.availabilityStart.loe(LocalDate.from(request.getBooking_start())));
        whereClause.and(qAccommodation.availabilityEnd.goe(LocalDate.from(request.getBooking_end())));

        QAccommodationBooking qBooking = QAccommodationBooking.accommodationBooking;

        BooleanBuilder bookingOverlapClause = new BooleanBuilder();
        bookingOverlapClause.and(qBooking.startDate.loe(LocalDateTime.from(request.getBooking_start())));
        bookingOverlapClause.and(qBooking.endDate.goe(LocalDateTime.from(request.getBooking_end())));

        whereClause.and(JPAExpressions.selectFrom(qBooking)
                .where(qBooking.accommodation.id.eq(qAccommodation.id)
                        .and(bookingOverlapClause))
                .notExists());

        return whereClause;
    }
}
