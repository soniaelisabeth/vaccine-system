package com.soni.vaccinessys.service;

import com.soni.vaccinessys.model.Vaccine;
import com.soni.vaccinessys.model.VaccineRegistry;

import java.util.List;

public interface VaccineRegistryService {
    public VaccineRegistry saveVaccineRegistry(VaccineRegistry vaccineRegistry);

    public List<VaccineRegistry> getAllVaccineRegistries();

}
