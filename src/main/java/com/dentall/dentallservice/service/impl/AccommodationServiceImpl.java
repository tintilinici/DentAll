package com.dentall.dentallservice.service.impl;

import com.dentall.dentallservice.exception.exceptions.AccommodationBookingNotFoundException;
import com.dentall.dentallservice.exception.exceptions.AccommodationNotFoundException;
import com.dentall.dentallservice.exception.exceptions.CustomerNotFoundException;
import com.dentall.dentallservice.exception.exceptions.NoBookingAvailableException;
import com.dentall.dentallservice.factory.AccommodationBookingFactory;
import com.dentall.dentallservice.mapper.AccommodationBookingMapper;
import com.dentall.dentallservice.model.domain.Accommodation;
import com.dentall.dentallservice.model.domain.AccommodationBooking;
import com.dentall.dentallservice.model.domain.AccommodationType;
import com.dentall.dentallservice.model.domain.Customer;
import com.dentall.dentallservice.model.domain.QAccommodation;
import com.dentall.dentallservice.model.domain.QAccommodationBooking;
import com.dentall.dentallservice.model.dto.AccommodationBookingDto;
import com.dentall.dentallservice.model.dto.AccommodationDto;
import com.dentall.dentallservice.model.request.BookAccommodationRequest;
import com.dentall.dentallservice.model.request.CreateAccommodationRequest;
import com.dentall.dentallservice.mapper.AccommodationMapper;
import com.dentall.dentallservice.model.request.SearchAccommodationBookingRequest;
import com.dentall.dentallservice.model.request.SearchAccommodationsRequest;
import com.dentall.dentallservice.repository.AccommodationBookingRepository;
import com.dentall.dentallservice.repository.AccommodationRepository;
import com.dentall.dentallservice.repository.CustomerRepository;
import com.dentall.dentallservice.service.AccommodationService;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AccommodationServiceImpl implements AccommodationService {

    @Autowired
    private AccommodationMapper accommodationMapper;

    @Autowired
    private AccommodationBookingMapper accommodationBookingMapper;

    @Autowired
    private AccommodationRepository accommodationRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AccommodationBookingRepository accommodationBookingRepository;

    @Autowired
    private EntityManager entityManager;

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
        QAccommodation qAccommodation = QAccommodation.accommodation;
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        BooleanBuilder whereClause = constructSearchAccommodationsWhereClause(request);

        List<Accommodation> accommodations = queryFactory.selectFrom(qAccommodation)
                .where(whereClause)
                .fetch();

        return accommodationMapper.modelsToDtos(accommodations);
    }

    @Override
    public AccommodationBookingDto bookAccommodation(BookAccommodationRequest request) {
        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id: '" + request.getCustomerId() + "' not found!"));

        QAccommodation qAccommodation = QAccommodation.accommodation;
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        BooleanBuilder whereClause = constructBookingRequestWhereClause(request);

        Accommodation availableAccommodation = queryFactory.selectFrom(qAccommodation)
                .where(whereClause)
                .fetchFirst();

        if (availableAccommodation == null) {
            throw new NoBookingAvailableException();
        }

        AccommodationBooking booking = AccommodationBookingFactory.create(request, customer, availableAccommodation);

        accommodationBookingRepository.save(booking);

        return accommodationBookingMapper.modelToDto(booking);
    }

    @Override
    public List<AccommodationBookingDto> searchAccommodationBookings(SearchAccommodationBookingRequest request) {
        List<AccommodationBooking> bookings;
        if (request.getCustomerId() != null) {
             bookings = accommodationBookingRepository.findByCustomerId(request.getCustomerId());
        } else {
            bookings = accommodationBookingRepository.findByAccommodationId(request.getAccommodationId());
        }

        return accommodationBookingMapper.modelsToDtos(bookings);
    }

    @Override
    public AccommodationBookingDto retrieveAccommodationBooking(String id) {
        AccommodationBooking booking = accommodationBookingRepository.findById(id)
                .orElseThrow(() -> new AccommodationBookingNotFoundException("Accommodation booking with id: '" + id + "' not found!"));

        return accommodationBookingMapper.modelToDto(booking);
    }

    private BooleanBuilder constructSearchAccommodationsWhereClause(SearchAccommodationsRequest request) {
        QAccommodation qAccommodation = QAccommodation.accommodation;
        BooleanBuilder whereClause = new BooleanBuilder();

        if (request.getLongitude() != null && request.getLatitude() != null) {
            String template = "ST_Distance_Sphere({0}, POINT({1}, {2}))";
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
            String template = "ST_Distance_Sphere({0}, POINT({1}, {2}))";
            NumberExpression<Double> distanceExpression = Expressions.numberTemplate(Double.class, template,
                    qAccommodation.location, Expressions.constant(request.getLongitude()), Expressions.constant(request.getLatitude()));
            whereClause.and(distanceExpression.loe(RADIUS));
        }


        if (request.getAccommodationType() != null) {
            whereClause.and(qAccommodation.accommodationType.eq(AccommodationType.valueOf(request.getAccommodationType())));
        }

        whereClause.and(qAccommodation.availability_start.loe(LocalDate.from(request.getBooking_start())));
        whereClause.and(qAccommodation.availability_end.goe(LocalDate.from(request.getBooking_end())));

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
