package com.soni.vaccinessys.service;

import com.soni.vaccinessys.model.VaccineRegistry;
import com.soni.vaccinessys.repository.VaccineRegistryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VaccineRegistryServiceImpl implements VaccineRegistryService {

    @Autowired
    private VaccineRegistryRepository vaccineRegistryRepository;

    @Override
    public VaccineRegistry saveVaccineRegistry(VaccineRegistry vaccineRegistry) {
        return vaccineRegistryRepository.save(vaccineRegistry);
    }

    @Override
    public List<VaccineRegistry> getAllVaccineRegistries() {
        return vaccineRegistryRepository.findAll();
    }
}
