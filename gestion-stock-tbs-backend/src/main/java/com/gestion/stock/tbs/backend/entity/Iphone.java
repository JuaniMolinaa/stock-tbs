package com.gestion.stock.tbs.backend.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gestion.stock.tbs.backend.Enum.Color;
import com.gestion.stock.tbs.backend.Enum.Condicion;
import com.gestion.stock.tbs.backend.Enum.Estado;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="iphone")
public class Iphone {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "modelo" , nullable = false)
	private String modelo;
	
	@Column(name = "color", nullable = false)
	@Enumerated(EnumType.STRING)
	private Color color;
	
	@Column(name = "capacidad", nullable = false)
	private String capacidad;
	
	@Column(name = "condicion", nullable = false)
	@Enumerated(EnumType.STRING)
	private Condicion condicion;
	
	@Column(name = "bateria")
	private Integer bateria;
	
	@Column(name = "precio", nullable = false)
	private Integer precio;
	
	@Column(name = "IMEI")
	private Long imei;
	
	@Column(name = "detalles")
	private String detalles;
	
	@Column(name = "estado", nullable = false)
	@Enumerated(EnumType.STRING)
	private Estado estado;
	
    @Column(name = "fecha", nullable = false)
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern="dd-MM-yyyy")
    private LocalDate fecha;

    @Column(name = "hora", nullable = false)
    @Temporal(TemporalType.TIME)
    @JsonFormat(pattern="HH:mm")
    private LocalTime hora;
    
}
