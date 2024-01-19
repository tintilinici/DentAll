# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
RUN ls -la
COPY pom.xml .
RUN ls -la
COPY src src

RUN mvn clean package -DskipTests

# Package stage
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","app.jar"]