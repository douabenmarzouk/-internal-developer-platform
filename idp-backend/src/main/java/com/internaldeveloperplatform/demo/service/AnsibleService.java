package com.internaldeveloperplatform.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class AnsibleService {

    @Value("${ansible.playbook.path}")
    private String ansiblePlaybookPath;

    public boolean runPlaybook(String serviceName, String language) {
        try {
            // Lance : ansible-playbook playbook.yml
            //         -e "service_name=xxx language=xxx"
            ProcessBuilder pb = new ProcessBuilder(
                    "ansible-playbook",
                    ansiblePlaybookPath,
                    "-e", "service_name=" + serviceName,
                    "-e", "language=" + language
            );

            // Redirige les erreurs vers stdout
            pb.redirectErrorStream(true);
            // Lance la commande
            Process process = pb.start();
            // Lit les logs en temps réel
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream())
            );

            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("[ANSIBLE] " + line);
            }
            // Attend la fin et récupère le code retour
            int exitCode = process.waitFor();
            // 0 = succès, autre = échec
            return exitCode == 0;

        } catch (Exception e) {
            System.err.println("[ANSIBLE ERROR] " + e.getMessage());
            return false;
        }
    }
}
