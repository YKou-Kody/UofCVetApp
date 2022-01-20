package com.jdbc_testing.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@SpringBootApplication
public class JdbcTestingApplication {

	public static void main(String[] args) {
		SpringApplication.run(JdbcTestingApplication.class, args);
	}

}
