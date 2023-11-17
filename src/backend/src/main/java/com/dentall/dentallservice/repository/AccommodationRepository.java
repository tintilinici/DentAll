package com.dentall.dentallservice.repository;

import com.dentall.dentallservice.model.domain.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, String>, QuerydslPredicateExecutor<Accommodation> {
}
