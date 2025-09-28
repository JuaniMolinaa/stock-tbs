package com.gestion.stock.tbs.backend.controller;

import java.util.List;
import java.util.Optional;
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
import com.gestion.stock.tbs.backend.service.IphoneService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")

public class IphoneController {

	@Autowired
	private IphoneService iphoneService;

	@GetMapping("/iphones")
	public List<Iphone> listarIphones(@RequestParam(required = false) Estado estado,
			@RequestParam(required = false) Condicion condicion, @RequestParam(required = false) String search) {
		return iphoneService.getAllIphones(estado, condicion, search);
	}

	@PostMapping("/iphones")
	public Iphone guardarIphone(@RequestBody Iphone iphone) {
		return iphoneService.createIphone(iphone);
	}

	@GetMapping("/iphones/{id}")
	public Optional<Iphone> buscarIphonePorId(@PathVariable Long id) {
		return iphoneService.getIphoneById(id);
	}

	@PutMapping("/iphones/{id}")
	public ResponseEntity<Iphone> actualizarIphone(@PathVariable Long id, @RequestBody Iphone iphoneRequest) {
		Iphone iphoneActualizado = iphoneService.updateIphone(id, iphoneRequest);
		return ResponseEntity.ok(iphoneActualizado);
	}

	@DeleteMapping("/iphones/{id}")
	public ResponseEntity<Void> eliminarIphone(@PathVariable Long id) {
		iphoneService.deleteIphone(id);
		return ResponseEntity.noContent().build();
	}
}// cierra IphoneController
