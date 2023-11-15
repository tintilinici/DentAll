package com.dentall.dentallservice.service.impl;

import com.dentall.dentallservice.exception.exceptions.AccommodationBookingNotFoundException;
import com.dentall.dentallservice.exception.exceptions.AccommodationNotDeletableException;
import com.dentall.dentallservice.exception.exceptions.AccommodationNotFound;
import com.dentall.dentallservice.exception.exceptions.AccommodationNotFoundException;
import com.dentall.dentallservice.exception.exceptions.PatientNotFoundException;
import com.dentall.dentallservice.exception.exceptions.NoBookingAvailableException;
import com.dentall.dentallservice.factory.AccommodationBookingFactory;
import com.dentall.dentallservice.mapper.AccommodationBookingMapper;
import com.dentall.dentallservice.model.domain.Accommodation;
import com.dentall.dentallservice.model.domain.AccommodationBooking;
import com.dentall.dentallservice.model.domain.AccommodationType;
import com.dentall.dentallservice.model.domain.Patient;
import com.dentall.dentallservice.model.domain.QAccommodation;
import com.dentall.dentallservice.model.domain.QAccommodationBooking;
import com.dentall.dentallservice.model.dto.AccommodationBookingDto;
import com.dentall.dentallservice.model.dto.AccommodationDto;
import com.dentall.dentallservice.model.request.BadRequestException;
import com.dentall.dentallservice.model.request.BookAccommodationRequest;
import com.dentall.dentallservice.model.request.CreateAccommodationRequest;
import com.dentall.dentallservice.mapper.AccommodationMapper;
import com.dentall.dentallservice.model.request.DeleteAccommodationBookingRequest;
import com.dentall.dentallservice.model.request.SearchAccommodationBookingRequest;
import com.dentall.dentallservice.model.request.SearchAccommodationsRequest;
import com.dentall.dentallservice.model.request.UpdateAccommodationRequest;
import com.dentall.dentallservice.repository.AccommodationBookingRepository;
import com.dentall.dentallservice.repository.AccommodationRepository;
import com.dentall.dentallservice.repository.PatientRepository;
import com.dentall.dentallservice.service.AccommodationService;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class AccommodationServiceImpl implements AccommodationService {

    @Autowired
    private AccommodationMapper accommodationMapper;

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
    public AccommodationDto createAccommodation(CreateAccommodationRequest request) {
        Accommodation accommodation = accommodationMapper.requestToModel(request);
        accommodationRepository.save(accommodation);
        return accommodationMapper.modelToDto(accommodation);
    }

    @Override
    public AccommodationDto retrieveAccommodation(String id) {
        Accommodation accommodation = accommodationRepository.findById(id)
                .orElseThrow(() -> new AccommodationNotFoundException("Accommodation with id: '" + id + "' not found!"));

        return accommodationMapper.modelToDto(accommodation);
    }

    @Override
    public List<AccommodationDto> searchAccommodations(SearchAccommodationsRequest request) {
        BooleanBuilder builder = constructSearchAccommodationsWhereClause(request);

        List<Accommodation> accommodations = new ArrayList<>();
        accommodationRepository.findAll(builder).forEach(accommodations::add);

        return accommodationMapper.modelsToDtos(accommodations);
    }

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
    public List<AccommodationBookingDto> searchAccommodationBookings(SearchAccommodationBookingRequest request) {
        List<AccommodationBooking> bookings;
        if (request.getPatientId() != null) {
             bookings = accommodationBookingRepository.findByPatientId(request.getPatientId());
        } else {
            bookings = accommodationBookingRepository.findByAccommodationId(request.getAccommodationId());
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
    public void deleteAccommodation(String id) {
        checkIfAccommodationExists(id);

        boolean bookingsExists = accommodationBookingRepository.existsByAccommodationId(id);
        if (bookingsExists) {
            throw new AccommodationNotDeletableException("Accommodation with id: '" + id + "' has reserved bookings.");
        }

        accommodationRepository.deleteById(id);
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

    @Override
    public AccommodationDto updateAccommodation(String id, UpdateAccommodationRequest request) {
        Accommodation accommodation = accommodationRepository.findById(id)
                .orElseThrow(() -> new AccommodationNotFound(id));

        if (request.getAccommodationType() != null) {
            accommodation.setAccommodationType(request.getAccommodationType());
        }
        if (request.getAddress() != null) {
            accommodation.setAddress(request.getAddress());
        }

        LocalDate startDate = request.getAvailabilityStart();
        LocalDate endDate = request.getAvailabilityEnd();
        if (startDate != null) {
            boolean isUpdatable = startDate.isBefore(accommodation.getAvailabilityEnd()) ||
                    (endDate != null && endDate.isAfter(startDate));
            if (!isUpdatable) {
                throw new BadRequestException("Conflict in updating accommodation's availability!");
            }
        }

        if (endDate != null) {
            boolean isUpdatable = endDate.isAfter(accommodation.getAvailabilityStart()) ||
                    (startDate != null && startDate.isBefore(endDate));
            if (!isUpdatable) {
                throw new BadRequestException("Conflict in updating accommodation's availability!");
            }
        }

        accommodationRepository.save(accommodation);
        return accommodationMapper.modelToDto(accommodation);
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

    private BooleanBuilder constructSearchAccommodationsWhereClause(SearchAccommodationsRequest request) {
        QAccommodation qAccommodation = QAccommodation.accommodation;
        BooleanBuilder whereClause = new BooleanBuilder();

        if (request.getLongitude() != null && request.getLatitude() != null) {
            String template = "ST_DistanceSphere({0}, ST_MakePoint({1}, {2}))";
            NumberExpression<Double> distanceExpression = Expressions.numberTemplate(Double.class, template,
                    qAccommodation.location, Expressions.constant(request.getLongitude()), Expressions.constant(request.getLatitude()));
            whereClause.and(distanceExpression.loe(RADIUS));
        }

        return whereClause;
    }

    private BooleanBuilder constructBookingRequestWhereClause(BookAccommodationRequest request) {
        QAccommodation qAccommodation = QAccommodation.accommodation;

        BooleanBuilder whereClause = new BooleanBuilder();

        if (request.getLongitude() != null && request.getLatitude() != null) {
            String template = "ST_DistanceSphere({0}, ST_MakePoint({1}, {2}))";
            NumberExpression<Double> distanceExpression = Expressions.numberTemplate(Double.class, template,
                    qAccommodation.location, Expressions.constant(request.getLongitude()), Expressions.constant(request.getLatitude()));
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
