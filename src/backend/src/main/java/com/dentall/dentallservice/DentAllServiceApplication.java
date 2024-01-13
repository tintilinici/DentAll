package com.dentall.dentallservice;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.StreamUtils;

import java.nio.charset.Charset;

@SpringBootApplication
public class DentAllServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(DentAllServiceApplication.class, args);
    }

    @Bean
    public CommandLineRunner initDatabase(JdbcTemplate jdbcTemplate, ResourceLoader resourceLoader) {
        return args -> {
            Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM accommodation", Integer.class);
            if (count == 0) {
                Resource resource = resourceLoader.getResource("classpath:data.sql");
                String sqlStatements = StreamUtils.copyToString(resource.getInputStream(), Charset.defaultCharset());
                String[] individualSqlStatements = sqlStatements.split(";");
                for(String sql : individualSqlStatements) {
                    if(!sql.trim().isEmpty()) {
                        jdbcTemplate.execute(sql);
                    }
                }
            }
        };
    }

}
