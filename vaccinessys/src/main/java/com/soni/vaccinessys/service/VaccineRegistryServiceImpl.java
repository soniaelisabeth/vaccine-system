package com.soni.vaccinessys.service;

import com.soni.vaccinessys.model.Vaccine;
import com.soni.vaccinessys.repository.VaccineRegistryRepository;
import com.soni.vaccinessys.repository.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VaccineRegistryServiceImpl implements VaccineRegistryService {

    @Autowired
    private VaccineRegistryRepository vaccineRegistryRepository;

    @Override
    public Vaccine saveVaccine(Vaccine vaccine) {
        return vaccineRegistryRepository.save(vaccine);
    }

    @Override
    public List<Vaccine> getAllVaccines() {
        return vaccineRegistryRepository.findAll();
    }
}
