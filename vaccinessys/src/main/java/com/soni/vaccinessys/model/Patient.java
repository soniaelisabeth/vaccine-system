package com.soni.vaccinessys.model;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String document;
    private Date birthDate;
    private String mobile;
    private String responsible;

    public Patient() {
    }
}
