package com.soni.vaccinessys.repository;

import com.soni.vaccinessys.model.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface VaccineRegistryRepository extends JpaRepository<Vaccine, Integer> {

}
