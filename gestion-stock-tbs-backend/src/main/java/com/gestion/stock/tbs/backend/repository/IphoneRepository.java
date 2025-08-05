package com.gestion.stock.tbs.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestion.stock.tbs.backend.entity.Iphone;

@Repository
public interface IphoneRepository extends JpaRepository<Iphone,Long>{

	List<Iphone> findByModelo(String modelo);
	Optional<Iphone> findById(Long id);

}
