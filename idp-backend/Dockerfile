# ============================================================
# Dockerfile — Backend Spring Boot
# Projet     : Internal Developer Platform (IDP)
# Auteur     : Doaa Ben Marzouk
# École      : ENICarthage
# ============================================================

# ---- Stage 1 : Development --------------------------------
FROM maven:3.9-eclipse-temurin-17-alpine AS development

WORKDIR /app

COPY pom.xml .
COPY src ./src

# Lancer les tests
RUN mvn clean test

# ---- Stage 2 : Build --------------------------------------
FROM maven:3.9-eclipse-temurin-17-alpine AS build

WORKDIR /app

COPY pom.xml .

# Télécharger dépendances
RUN mvn dependency:go-offline -B

COPY src ./src

# Compiler → générer .jar
RUN mvn clean package -DskipTests

# ---- Stage 3 : Production ---------------------------------
FROM eclipse-temurin:17-jre-alpine AS production

WORKDIR /app

# Installer outils nécessaires
RUN apk add --no-cache \
    curl \
    wget \
    unzip \
    bash

# Installer Terraform
RUN wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip && \
    unzip terraform_1.6.0_linux_amd64.zip && \
    mv terraform /usr/local/bin/ && \
    rm terraform_1.6.0_linux_amd64.zip

# Installer kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
    chmod +x kubectl && \
    mv kubectl /usr/local/bin/

# Copier .jar depuis stage build
COPY --from=build /app/target/*.jar app.jar

# Sécurité → pas root
RUN addgroup -S idp && adduser -S idp -G idp
USER idp

EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1

CMD ["java", "-jar", "app.jar"]