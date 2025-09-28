package com.gestion.stock.tbs.backend;

import com.gestion.stock.tbs.backend.exception.ResourceNotFoundException;
import com.gestion.stock.tbs.backend.entity.Iphone;
import com.gestion.stock.tbs.backend.Enum.Estado;
import com.gestion.stock.tbs.backend.repository.IphoneRepository;
import com.gestion.stock.tbs.backend.service.IphoneService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.time.LocalDate;
import java.util.Optional;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension; // Necesario para la anotación @ExtendWith

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class IphoneTest {

	// 1. Simula el repositorio (la dependencia)
	@Mock
	private IphoneRepository iphoneRepository;

	// 2. Inyecta los mocks en la clase que queremos probar
	@InjectMocks
	private IphoneService iphoneService;

	private Iphone iphoneInicial;

	@BeforeEach
	void setUp() {
		// Objeto inicial que usaremos en las pruebas
		iphoneInicial = new Iphone();
		iphoneInicial.setId(1L);
		iphoneInicial.setModelo("iPhone 13");
		iphoneInicial.setEstado(Estado.DISPONIBLE);
		iphoneInicial.setPrecio(600);
	}

	// ==========================================================
	// CASO DE PRUEBA: GUARDAR UN NUEVO IPHONE
	// ==========================================================
	@Test
	void whenCreateIphone_shouldAssignDateAndTimeAndSave() {
		// ARRANGE (Preparación)
		// Definir qué debe hacer el repositorio simulado al llamar a save()
		when(iphoneRepository.save(any(Iphone.class))).thenReturn(iphoneInicial);

		// ACT (Ejecución)
		Iphone iphoneGuardado = iphoneService.createIphone(iphoneInicial);

		// ASSERT (Verificación)
		// 1. Verificar que el objeto devuelto no es nulo y tiene el ID
		assertNotNull(iphoneGuardado);
		assertEquals(1L, iphoneGuardado.getId());

		// 2. Verificar que el servicio asignó la fecha y hora antes de guardar
		assertEquals(LocalDate.now(), iphoneGuardado.getFecha());
		assertNotNull(iphoneGuardado.getHora());

		// 3. Verificar que el método save() del repositorio fue llamado exactamente una
		// vez
		verify(iphoneRepository, times(1)).save(iphoneGuardado);
	}

	//CASO DE PRUEBA: ACTUALIZACIÓN DE IPHONE NO ENCONTRADO
	@Test
	void whenUpdateIphone_withInvalidId_shouldThrowResourceNotFoundException() {
		// ARRANGE
		Long invalidId = 99L;
		// Definir que el repositorio no encontrará el objeto
		when(iphoneRepository.findById(invalidId)).thenReturn(Optional.empty());

		// ACT & ASSERT
		// Verificar que la excepción es lanzada cuando se intenta actualizar
		assertThrows(ResourceNotFoundException.class, () -> {
			iphoneService.updateIphone(invalidId, new Iphone());
		});

		// Verificar que el método save() NUNCA fue llamado
		verify(iphoneRepository, never()).save(any(Iphone.class));
	}
}
