package com.soni.vaccinessys.controller;

import com.soni.vaccinessys.model.VaccineRegistry;
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
    public String add(@RequestBody VaccineRegistry vaccineRegistry) {
        vaccineRegistryService.saveVaccineRegistry(vaccineRegistry);
        return "New Vaccine registry added";
    }

    @GetMapping("/getAll")
    public List<VaccineRegistry> getAllVaccines() {
        return vaccineRegistryService.getAllVaccineRegistries();
    }

}
