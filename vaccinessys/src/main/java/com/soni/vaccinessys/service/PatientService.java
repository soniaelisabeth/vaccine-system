package com.soni.vaccinessys.service;

import com.soni.vaccinessys.model.Patient;

import java.util.List;

public interface PatientService {
    public Patient savePatient(Patient patient);

    Patient updatePatient(Patient patient);

    public List<Patient> getAllPatients();

}
