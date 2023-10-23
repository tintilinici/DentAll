package com.dentall.dentallservice.repository;

import com.dentall.dentallservice.model.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, String> {
}
