package com.dentall.dentallservice.factory;

import com.dentall.dentallservice.model.domain.AccommodationOrder;
import com.dentall.dentallservice.model.domain.AccommodationType;
import com.dentall.dentallservice.model.domain.Patient;
import com.dentall.dentallservice.model.request.CreateAccommodationOrderRequest;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;
import java.util.UUID;

public class AccommodationOrderFactory {

    public static AccommodationOrder create(CreateAccommodationOrderRequest request, Patient patient){
        System.out.println(request.getArrivalDateTime());
        return AccommodationOrder.builder()
                .id(UUID.randomUUID().toString())
                .patient(patient)
                .location(toPoint(request.getLongitude(), request.getLatitude()))
                .accommodationSize(request.getAccommodationSize())
                .arrivalDateTime(LocalDateTime.from(request.getArrivalDateTime()))
                .departureDateTime(LocalDateTime.from(request.getDepartureDateTime()))
                .accommodationType(AccommodationType.valueOf(request.getAccommodationType()))
                .build();
    }

    private static Point toPoint(String longitude, String latitude) {
        GeometryFactory geometryFactory = new GeometryFactory();
        return geometryFactory.createPoint(new Coordinate(Double.parseDouble(longitude), Double.parseDouble(latitude)));
    }

}
