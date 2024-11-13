package com.daniellaera.spring_boot_vuejs.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping
    public String home() {
        return "Welcome to Spring Boot Application !";
    }
}
