package com.gestion.stock.tbs.backend.configuracion;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig {
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**") // all endpoints
				.allowedOrigins("http://localhost:5173") // local frontend
				.allowedMethods("*") // GET, POST, PUT, DELETE, etc.
				.allowedHeaders("*")
				.allowCredentials(true);
			}
		};
	}
}

