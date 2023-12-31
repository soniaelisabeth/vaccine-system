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
    public String name;
    public String subtipo;
    public String idade;
    public String doses;
    public String intervaloEntreDoses;

    public Vaccine() {
    }
}
