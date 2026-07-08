package com.internaldeveloperplatform.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // Autorise React (localhost:3000)
        config.addAllowedOrigin("http://localhost:3000");

        // Autorise tous les headers
        config.addAllowedHeader("*");

        // Autorise GET, POST, PUT, DELETE
        config.addAllowedMethod("*");

        // Autorise les cookies
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        // Applique la config à tous les endpoints
        source.registerCorsConfiguration("/api/**", config);

        return new CorsFilter(source);
    }
}