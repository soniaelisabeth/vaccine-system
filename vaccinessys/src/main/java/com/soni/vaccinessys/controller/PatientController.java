package com.soni.vaccinessys.controller;

import com.soni.vaccinessys.model.Patient;
import com.soni.vaccinessys.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patient")
@CrossOrigin
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/add")
    public String add(@RequestBody Patient patient) {
        patientService.savePatient(patient);
        return "New patient added";
    }

    @GetMapping("/getAll")
    public List<Patient> getAllPatients() { return patientService.getAllPatients(); }

}
