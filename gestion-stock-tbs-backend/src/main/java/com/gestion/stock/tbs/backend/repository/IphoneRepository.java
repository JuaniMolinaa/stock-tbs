package com.gestion.stock.tbs.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gestion.stock.tbs.backend.Enum.Condicion;
import com.gestion.stock.tbs.backend.Enum.Estado;
import com.gestion.stock.tbs.backend.entity.Iphone;

@Repository
public interface IphoneRepository extends JpaRepository<Iphone, Long> {

	List<Iphone> findByModelo(String modelo);

	Optional<Iphone> findById(Long id);

	@Query("SELECT i FROM Iphone i WHERE " + "(:estado IS NULL OR i.estado = :estado) AND "
			+ "(:condicion IS NULL OR i.condicion = :condicion) AND "
			+ "(:searchTerm IS NULL OR LOWER(i.modelo) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")

	// OR "+ "LOWER(CAST(i.imei AS text)) LIKE LOWER(CONCAT('%', :searchTerm,
	// '%')))") // Usamos CAST

	List<Iphone> findByOptionalFilters(@Param("estado") Estado estado, @Param("condicion") Condicion condicion,
			@Param("searchTerm") String searchTerm);
}