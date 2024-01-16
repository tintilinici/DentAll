package com.dentall.dentallservice.service.impl;

import com.dentall.dentallservice.exception.exceptions.AccommodationNotDeletableException;
import com.dentall.dentallservice.exception.exceptions.AccommodationNotFound;
import com.dentall.dentallservice.exception.exceptions.AccommodationNotFoundException;
import com.dentall.dentallservice.model.domain.Accommodation;
import com.dentall.dentallservice.model.domain.QAccommodation;
import com.dentall.dentallservice.model.dto.AccommodationDto;
import com.dentall.dentallservice.exception.exceptions.BadRequestException;
import com.dentall.dentallservice.model.request.CreateAccommodationRequest;
import com.dentall.dentallservice.mapper.AccommodationMapper;
import com.dentall.dentallservice.model.request.UpdateAccommodationRequest;
import com.dentall.dentallservice.repository.AccommodationBookingRepository;
import com.dentall.dentallservice.repository.AccommodationRepository;
import com.dentall.dentallservice.service.AccommodationService;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class AccommodationServiceImpl implements AccommodationService {

    @Autowired
    private AccommodationMapper accommodationMapper;

    @Autowired
    private AccommodationRepository accommodationRepository;

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
    public List<AccommodationDto> retrieveAccommodations() {
        List<Accommodation> accommodations = accommodationRepository.findAll();
        return accommodationMapper.modelsToDtos(accommodations);
    }

    @Override
    public AccommodationDto retrieveAccommodation(String id) {
        Accommodation accommodation = accommodationRepository.findById(id)
                .orElseThrow(() -> new AccommodationNotFoundException("Accommodation with id: '" + id + "' not found!"));

        return accommodationMapper.modelToDto(accommodation);
    }

    @Override
    public List<AccommodationDto> searchAccommodations(String longitude, String latitude) {
        BooleanBuilder builder = constructSearchAccommodationsWhereClause(longitude, latitude);

        List<Accommodation> accommodations = new ArrayList<>();
        accommodationRepository.findAll(builder).forEach(accommodations::add);

        return accommodationMapper.modelsToDtos(accommodations);
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


    private BooleanBuilder constructSearchAccommodationsWhereClause(String longitude, String latitude) {
        QAccommodation qAccommodation = QAccommodation.accommodation;
        BooleanBuilder whereClause = new BooleanBuilder();

        if (longitude != null && latitude != null) {
            String template = "ST_DistanceSphere({0}, ST_MakePoint({1}, {2}))";
            NumberExpression<Double> distanceExpression = Expressions.numberTemplate(Double.class, template,
                    qAccommodation.location, Expressions.constant(Double.parseDouble(longitude)), Expressions.constant(Double.parseDouble(latitude)));
            whereClause.and(distanceExpression.loe(RADIUS));
        }

        return whereClause;
    }

    private void checkIfAccommodationExists(String id) {
        boolean exists = accommodationRepository.existsById(id);
        if (!exists) {
            throw new AccommodationNotFound(id);
        }
    }
}
