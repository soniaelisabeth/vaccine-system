package com.soni.vaccinessys.controller;

import com.soni.vaccinessys.model.Vaccine;
import com.soni.vaccinessys.service.VaccineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vaccine")
@CrossOrigin
public class VaccineController {

    @Autowired
    private VaccineService vaccineService;

    @PostMapping("/add")
    public String add(@RequestBody Vaccine vaccine) {
        vaccineService.saveVaccine(vaccine);
        return "New Vaccine added";
    }

    @PostMapping("/update")
    public String updateVaccine(@RequestBody Vaccine vaccine) {
        return "Vaccine updated";
    }

    @GetMapping("/getAll")
    public List<Vaccine> getAllVaccines() {
        return vaccineService.getAllVaccines();
    }

}
