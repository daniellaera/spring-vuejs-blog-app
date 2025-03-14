package com.daniellaera.spring_boot_vuejs.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        // Allow multiple origins: development and production
        List<String> allowedOrigins = Arrays.asList(
                "http://localhost:5173",  // Local development
                "https://spring-vue-blog-frontend.fly.dev",  // Production frontend URL
                "https://athletic-spontaneity-staging-frontend.up.railway.app"  // Railway Production frontend URL
        );
        corsConfiguration.setAllowedOrigins(allowedOrigins);

        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
        corsConfiguration.setExposedHeaders(List.of("Authorization"));
        corsConfiguration.setAllowCredentials(true);  // Allow credentials (cookies, etc.)
        corsConfiguration.setMaxAge(3600L);  // Pre-flight request max age in seconds

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsFilter(source);
    }
}
