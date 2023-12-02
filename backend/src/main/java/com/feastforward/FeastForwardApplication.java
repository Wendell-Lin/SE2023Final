package com.feastforward;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
 
import jakarta.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
public class FeastForwardApplication {
	@PostConstruct
	void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("GMT+8"));
	}

	public static void main(String[] args) {
		SpringApplication.run(FeastForwardApplication.class, args);
	}

}
