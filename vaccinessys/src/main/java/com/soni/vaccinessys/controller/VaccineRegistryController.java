package com.soni.vaccinessys.controller;

import com.soni.vaccinessys.model.Vaccine;
import com.soni.vaccinessys.service.VaccineRegistryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vaccineRegistry")
@CrossOrigin
public class VaccineRegistryController {

    @Autowired
    private VaccineRegistryService vaccineRegistryService;

    @PostMapping("/add")
    public String add(@RequestBody Vaccine vaccine) {
        vaccineRegistryService.saveVaccine(vaccine);
        return "New Vaccine registry added";
    }

    @GetMapping("/getAll")
    public List<Vaccine> getAllVaccines() {
        return vaccineRegistryService.getAllVaccines();
    }

}
