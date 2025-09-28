package com.gestion.stock.tbs.backend.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestion.stock.tbs.backend.Enum.Condicion;
import com.gestion.stock.tbs.backend.Enum.Estado;
import com.gestion.stock.tbs.backend.entity.Iphone;
import com.gestion.stock.tbs.backend.exception.ResourceNotFoundException;
import com.gestion.stock.tbs.backend.repository.IphoneRepository;

@Service
public class IphoneService {

    @Autowired
    private IphoneRepository iphoneRepository;

    public List<Iphone> getAllIphones(Estado estado, Condicion condicion, String search) {
        //lógica de negocio para listar
        return iphoneRepository.findByOptionalFilters(estado, condicion, search);
    }

    public Iphone createIphone(Iphone iphone) {
        //lógica de negocio para guardar
        iphone.setFecha(LocalDate.now());
        iphone.setHora(LocalTime.now());
        return iphoneRepository.save(iphone);
    }

    public Optional<Iphone> getIphoneById(Long id) {
        //lógica de negocio para buscar
        return iphoneRepository.findById(id);
    }

    public Iphone updateIphone(Long id, Iphone iphoneRequest) {
        //lógica de negocio para actualizar
        Iphone iphone = iphoneRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El equipo seleccionado no se puede actualizar porque no existe"));

        // Se actualizan solo los campos que vienen en la petición
        iphone.setImei(iphoneRequest.getImei());
        iphone.setModelo(iphoneRequest.getModelo());
        iphone.setColor(iphoneRequest.getColor());
        iphone.setCapacidad(iphoneRequest.getCapacidad());
        iphone.setCondicion(iphoneRequest.getCondicion());
        iphone.setBateria(iphoneRequest.getBateria());
        iphone.setPrecio(iphoneRequest.getPrecio());
        iphone.setDetalles(iphoneRequest.getDetalles());
        iphone.setEstado(iphoneRequest.getEstado());

        return iphoneRepository.save(iphone);
    }

    public void deleteIphone(Long id) {
        //lógica de negocio para eliminar
        Iphone iphone = iphoneRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró el iPhone con id: " + id));

        iphoneRepository.delete(iphone);
    }
}
