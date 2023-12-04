package com.soni.vaccinessys.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class VaccineRegistry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String childName;
    public String vaccineName;
    public String document;
    public String date;
    public String doctor;
    public String unidade;

    public VaccineRegistry() {
    }
}
