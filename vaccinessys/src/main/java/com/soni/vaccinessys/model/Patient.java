package com.soni.vaccinessys.model;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String birthDate;
    public String document;
    public String mobile;
    public String name;
    public String responsible;

    public Patient() {
    }
}
