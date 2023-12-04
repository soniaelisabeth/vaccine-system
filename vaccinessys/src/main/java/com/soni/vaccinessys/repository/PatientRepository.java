package com.soni.vaccinessys.repository;

import com.soni.vaccinessys.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {

    @Modifying
    @Query("UPDATE Patient p " +
            "SET p.birthDate = :#{#patient.birthDate}, " +
            "p.document = :#{#patient.document}, " +
            "p.fullName = :#{#patient.fullName}, " +
            "p.mobile = :#{#patient.mobile}, " +
            "p.responsible = :#{#patient.responsible} " +
            "WHERE p.id = :#{#patient.id}")
    Patient updatePatient(@Param("patient") Patient patient);
}
