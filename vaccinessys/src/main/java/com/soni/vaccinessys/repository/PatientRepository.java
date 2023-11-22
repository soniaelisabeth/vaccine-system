package com.soni.vaccinessys.repository;

import com.soni.vaccinessys.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface PatientRepository extends JpaRepository<Patient, Integer> {
}
