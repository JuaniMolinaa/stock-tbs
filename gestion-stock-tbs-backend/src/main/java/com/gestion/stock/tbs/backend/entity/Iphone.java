package com.gestion.stock.tbs.backend.entity;

import com.gestion.stock.tbs.backend.Enum.Color;
import com.gestion.stock.tbs.backend.Enum.Estado;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
	
	@Column(name = "modelo")
	private String modelo;
	
	@Column(name = "color", nullable = false)
	@Enumerated(EnumType.STRING)
	private Color color;
	
	@Column(name = "capacidad")
	private String capacidad;
	
	@Column(name = "bateria")
	private Integer bateria;
	
	@Column(name = "precio")
	private Integer precio;
	
	@Column(name = "IMEI")
	private Long imei;
	
	@Column(name = "detalles")
	private String detalles;
	
	@Column(name = "estado", nullable = false)
	@Enumerated(EnumType.STRING)
	private Estado estado;
}
