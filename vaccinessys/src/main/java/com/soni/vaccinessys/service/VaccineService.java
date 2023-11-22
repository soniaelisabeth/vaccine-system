package com.soni.vaccinessys.service;

import com.soni.vaccinessys.model.Vaccine;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VaccineService {
    public Vaccine saveVaccine(Vaccine vaccine);

    public List<Vaccine> getAllVaccines();

}
