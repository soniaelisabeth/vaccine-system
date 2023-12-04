package com.soni.vaccinessys.service;

import com.soni.vaccinessys.model.Vaccine;

import java.util.List;

public interface VaccineRegistryService {
    public Vaccine saveVaccine(Vaccine vaccine);

    public List<Vaccine> getAllVaccines();

}
