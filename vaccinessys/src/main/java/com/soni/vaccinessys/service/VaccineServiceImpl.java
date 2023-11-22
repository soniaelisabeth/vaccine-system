package com.soni.vaccinessys.service;

import com.soni.vaccinessys.model.Vaccine;
import com.soni.vaccinessys.repository.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VaccineServiceImpl implements VaccineService {

    @Autowired
    private VaccineRepository vaccineRepository;

    @Override
    public Vaccine saveVaccine(Vaccine vaccine) {
        return vaccineRepository.save(vaccine);
    }

    @Override
    public List<Vaccine> getAllVaccines() {
        return vaccineRepository.findAll();
    }
}
