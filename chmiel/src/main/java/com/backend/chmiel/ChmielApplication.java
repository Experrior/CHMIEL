package com.backend.chmiel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ChmielApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChmielApplication.class, args);
	}

}
