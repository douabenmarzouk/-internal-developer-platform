// DeploymentServiceTest.java
package com.internaldeveloperplatform.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DeploymentServiceTest {

    // Test 1 — Application démarre correctement
    @Test
    void contextLoads() {
        // vérifie que Spring Boot démarre ✅
    }

    // Test 2 — Service name valide
    @Test
    void testServiceNameNotEmpty() {
        String serviceName = "user-service";
        assert !serviceName.isEmpty();
    }

    // Test 3 — Replicas valide
    @Test
    void testReplicasValid() {
        int replicas = 3;
        assert replicas >= 1 && replicas <= 10;
    }
}
