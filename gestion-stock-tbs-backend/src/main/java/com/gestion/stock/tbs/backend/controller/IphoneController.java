package com.gestion.stock.tbs.backend.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.stock.tbs.backend.Enum.Condicion;
import com.gestion.stock.tbs.backend.Enum.Estado;
import com.gestion.stock.tbs.backend.entity.Iphone;
import com.gestion.stock.tbs.backend.exception.ResourceNotFoundException;
import com.gestion.stock.tbs.backend.repository.IphoneRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class IphoneController {

	@Autowired
	private IphoneRepository iphoneRepository;

	@GetMapping("/iphones")
	public List<Iphone> listarIphones(@RequestParam(required = false) Estado estado,
			@RequestParam(required = false) Condicion condicion, @RequestParam(required = false) String search) {

		return iphoneRepository.findByOptionalFilters(estado, condicion, search);
	}

	@PostMapping("/iphones")
	public Iphone guardarIphone(@RequestBody Iphone iphone) {
		iphone.setFecha(LocalDate.now());
		iphone.setHora(LocalTime.now());
		return iphoneRepository.save(iphone);
	}

	@GetMapping("/iphones/{id}")
	public Optional<Iphone> buscarIphonePorId(@PathVariable Long id) {
		return iphoneRepository.findById(id);
	}

	@PutMapping("/iphones/{id}")
	public ResponseEntity<Iphone> actualizarIphone(@PathVariable Long id, @RequestBody Iphone iphoneRequest) {
		Iphone iphone = iphoneRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("El equipo seleccionado no se puede actualizar porque no existe"));

		iphone.setImei(iphoneRequest.getImei());
		iphone.setModelo(iphoneRequest.getModelo());
		iphone.setColor(iphoneRequest.getColor());
		iphone.setCapacidad(iphoneRequest.getCapacidad());
		iphone.setCondicion(iphoneRequest.getCondicion());
		iphone.setBateria(iphoneRequest.getBateria());
		iphone.setPrecio(iphoneRequest.getPrecio());
		iphone.setDetalles(iphoneRequest.getDetalles());
		iphone.setEstado(iphoneRequest.getEstado());

		Iphone iphoneActualizado = iphoneRepository.save(iphone);
		return ResponseEntity.ok(iphoneActualizado);
	}

	@DeleteMapping("/iphones/{id}")
	public ResponseEntity<Void> eliminarIphone(@PathVariable Long id) {
		Iphone iphone = iphoneRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No se encontró el iPhone con id: " + id));

		iphoneRepository.delete(iphone);
		return ResponseEntity.noContent().build();
	}

}// cierra IphoneController
