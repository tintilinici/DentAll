# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src src

RUN mvn clean package -DskipTests

# Package stage
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/quarkus-app /app/quarkus-app
EXPOSE 8081
ENTRYPOINT ["java","-jar","/app/quarkus-app/quarkus-run.jar"]