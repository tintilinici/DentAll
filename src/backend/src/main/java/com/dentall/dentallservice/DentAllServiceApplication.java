package com.dentall.dentallservice;

import com.dentall.dentallservice.model.domain.SecurityRole;
import com.dentall.dentallservice.model.domain.SecurityUser;
import com.dentall.dentallservice.repository.SecurityRoleRepository;
import com.dentall.dentallservice.repository.SecurityUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StreamUtils;

import java.nio.charset.Charset;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@SpringBootApplication
@EnableScheduling
public class DentAllServiceApplication {

    @Autowired
    private SecurityRoleRepository securityRoleRepository;

    @Autowired
    private SecurityUserRepository securityUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(DentAllServiceApplication.class, args);
    }

    @Bean
    public CommandLineRunner initDatabase(JdbcTemplate jdbcTemplate, ResourceLoader resourceLoader) {
        return args -> {
            Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM accommodation", Integer.class);
            if (count == 0) {



                securityRoleRepository.save(SecurityRole.builder()
                        .id(UUID.randomUUID().toString())
                        .name("ROLE_TRANSPORT").build());
                securityRoleRepository.save(SecurityRole.builder()
                        .id(UUID.randomUUID().toString())
                        .name("ROLE_ACCOMMODATION").build());
                securityRoleRepository.save(SecurityRole.builder()
                        .id(UUID.randomUUID().toString())
                        .name("ROLE_PATIENT").build());

                List<SecurityRole> roles = securityRoleRepository.findAll();

                securityUserRepository.save(SecurityUser.builder()
                        .email("admin@admin.com")
                        .createdAt(LocalDateTime.now())
                        .roles(roles)
                        .password(passwordEncoder.encode("admin"))
                        .build());

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
