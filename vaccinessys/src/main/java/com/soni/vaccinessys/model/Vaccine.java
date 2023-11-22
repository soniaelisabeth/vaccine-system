package com.soni.vaccinessys.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Vaccine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String date;
    public String doctor;
    public String document;
    public String lote;
    public String name;
    public String unidade;
    public String vaccineName;

    public Vaccine() {
    }
}
