# Этап 1: Сборка
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Копируем только pom.xml для кэширования зависимостей
COPY pom.xml .
COPY smart-schedule-impl/pom.xml smart-schedule-impl/
COPY security/pom.xml security/

# Скачиваем зависимости (этот слой будет кэшироваться)
RUN mvn dependency:go-offline -B

# Копируем исходники
COPY smart-schedule-impl/src smart-schedule-impl/src
COPY security/src security/src

# Собираем проект
RUN mvn clean package

# Этап 2: Запуск
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Создаём непривилегированного пользователя
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Копируем собранный JAR из первого этапа
COPY --from=builder /app/smart-schedule-impl/target/*.jar app.jar

# Порт из конфига
EXPOSE 8080

# Переключаемся на непривилегированного пользователя
USER appuser

# Запускаем
ENTRYPOINT ["java", "-jar", "app.jar"]