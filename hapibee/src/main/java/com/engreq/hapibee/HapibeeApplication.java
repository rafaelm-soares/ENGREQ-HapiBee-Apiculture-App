package com.engreq.hapibee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HapibeeApplication {

	public static void main(String[] args) {
		SpringApplication.run(HapibeeApplication.class, args);
		System.out.println("Application is running");
	}

}
