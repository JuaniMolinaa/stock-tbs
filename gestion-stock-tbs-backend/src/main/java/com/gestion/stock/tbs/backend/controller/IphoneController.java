package com.gestion.stock.tbs.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import org.springframework.web.bind.annotation.RestController;
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
	public List<Iphone> listarIphones(){
		return iphoneRepository.findAll();
	}
	
	@PostMapping("/iphones")
	public Iphone guardarIphone(@RequestBody Iphone iphone){
		return iphoneRepository.save(iphone);
	}
	
	 /*@GetMapping("/iphones/{modelo}")
	    public List<Iphone> buscarIphonePorModelo(@PathVariable String modelo) {
	        return iphoneRepository.findByModelo(modelo);
	    }*/
	 
	 @GetMapping("/iphones/{id}")
	    public Optional<Iphone> buscarIphonePorId(@PathVariable Long id) {
	        return iphoneRepository.findById(id);
	    }
	 
	 @PutMapping("/iphones/{id}")
	    public ResponseEntity<Iphone> actualizarIphone(@PathVariable Long id, @RequestBody Iphone iphoneRequest) {
	       Iphone iphone = iphoneRepository.findById(id)
	    		   .orElseThrow(() -> new ResourceNotFoundException("El equipo seleccionado no se puede actualizar porque no existe"));
	       iphone.setImei(iphone.getImei());
	       iphone.setModelo(iphone.getModelo());
	       iphone.setColor(iphone.getColor());
	       iphone.setCapacidad(iphone.getCapacidad());
	       iphone.setBateria(iphone.getBateria());
	       iphone.setPrecio(iphone.getPrecio());
	       iphone.setDetalles(iphone.getDetalles());
	       iphone.setEstado(iphone.getEstado());
	       
	       
	       Iphone iphoneActualizado = iphoneRepository.save(iphone);
	       return ResponseEntity.ok(iphoneActualizado);
	 }
	 
	 @DeleteMapping("iphones/eliminar/{id}")
	 public ResponseEntity<Map<String, Boolean>> eliminarIphone(@PathVariable Long id){
		 Iphone iphone = iphoneRepository.findById(id)
	    		   .orElseThrow(() -> new ResourceNotFoundException("El equipo seleccionado no existe"));
		 
		 iphoneRepository.delete(iphone);
		 Map<String,Boolean> respuesta = new HashMap<>();
		 respuesta.put("eliminado", Boolean.TRUE);
		 return ResponseEntity.ok(respuesta);
	 }
	 
	 
}//cierra IphoneController
