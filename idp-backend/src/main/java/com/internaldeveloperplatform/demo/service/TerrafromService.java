package com.internaldeveloperplatform.demo.service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
@Service
public class TerrafromService {
    @Value("${terraform.path}")
    private String terraformPath;
    public boolean init(){
        return runCommand("wsl","terraform","init");
    }
    public boolean apply(String serviceName, String language, Integer replicas) {
        return runCommand(
               "wsl", "terraform", "apply",
                "-auto-approve",
                "-var", "service_name=" + serviceName,
                "-var", "language=" + language,
                "-var", "replicas=" + replicas
        );
    }
    public  boolean destroy (String serviceName){
        return runCommand(
              "wsl",  "terraform","destroy",
                "-auto-approve",
                "-var","service_name=" +serviceName
        );
    }
    private boolean runCommand(String... command) {
        try {
            ProcessBuilder pb = new ProcessBuilder(command);

            // Exécute dans le dossier terraform
            pb.directory(new File(terraformPath));
            pb.redirectErrorStream(true);

            Process process = pb.start();

            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream())
            );

            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("[TERRAFORM] " + line);
            }

            int exitCode = process.waitFor();
            return exitCode == 0;

        } catch (Exception e) {
            System.err.println("[TERRAFORM ERROR] " + e.getMessage());
            return false;
        }
    }
}
