package com.dentall.dentallservice.model.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    private String id;

    private String firstName;

    private String lastName;

    private String PIN;

    private String phoneNumber;

    private String email;

    @OneToMany(mappedBy = "patient")
    private List<AccommodationOrder> accommodationOrders;

}
