# ============================================================
# Dockerfile — Backend Spring Boot (IDP)
# Auteur : Doaa Ben Marzouk
# Note   : Spring Boot tourne sur Windows pour dev
#          Ce Dockerfile sera utilisé après pour K3s
# ============================================================

# ---- Stage 1 : Build --------------------------------------
FROM maven:3.9-eclipse-temurin-17-alpine AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

# ---- Stage 2 : Production ---------------------------------
FROM eclipse-temurin:17-jre-alpine AS production

WORKDIR /app

RUN apk add --no-cache curl

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8085

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD curl -f http://localhost:8085/actuator/health || exit 1

CMD ["java", "-jar", "app.jar"]