package com.soni.vaccinessys.model;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String birthDate;
    private String document;
    private String mobile;
    private String name;
    private String responsible;

    public Patient() {
    }
}
