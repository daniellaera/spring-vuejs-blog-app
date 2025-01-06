package com.daniellaera.spring_boot_vuejs.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@ExtendWith(MockitoExtension.class)
public class HelloControllerTest {

    @InjectMocks
    private HelloController helloController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(helloController).build();
    }

    @Test
    void getHome() throws Exception {
        mockMvc.perform(get("")).andExpect(content().string("Welcome to Spring Boot Application !"));
    }

    @Test
    void getHello() throws Exception {
        mockMvc.perform(get("/hello")).andExpect(content().string("Hello World!"));
    }
}
