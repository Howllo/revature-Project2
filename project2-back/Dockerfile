FROM eclipse-temurin:21-jdk-alpine
LABEL authors="Tony"

# Create and use an application directory
WORKDIR /app

# Copy the JAR file from the build context
COPY target/project1-0.0.1-SNAPSHOT.jar app.jar

# Expose the Spring Boot port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]