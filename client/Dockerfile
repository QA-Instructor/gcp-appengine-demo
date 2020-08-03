FROM maven:3-openjdk-8 as builder

# Copy local code to the container image.
WORKDIR /app
COPY pom.xml .
COPY src ./src

# Build a release artifact.
RUN mvn package 

FROM openjdk:8-jdk-alpine

COPY --from=builder /app/target/java-*.jar /java.jar

# Run the web service on container startup.
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-Dserver.port=${PORT}","-jar","/java.jar"]