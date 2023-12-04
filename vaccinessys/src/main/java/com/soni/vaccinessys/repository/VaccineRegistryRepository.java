package com.soni.vaccinessys.repository;

import com.soni.vaccinessys.model.VaccineRegistry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface VaccineRegistryRepository extends JpaRepository<VaccineRegistry, Integer> {

}
