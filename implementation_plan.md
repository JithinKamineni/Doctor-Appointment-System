# Doctor Appointment System Spring Boot Backend

The goal is to build a complete, runnable Spring Boot 3 backend for a Doctor Appointment System as described, encompassing session-based authentication, role-based access control, appointment booking with pessimistic locking, and notifications.

## Proposed Changes

We will create a new Maven Spring Boot project structure in the workspace.

### Core Dependencies
- Spring Web
- Spring Data JPA
- Spring Security
- Spring Boot Email (JavaMailSender)
- Spring Boot Validation
- MySQL Driver
- Lombok

### Implementation Steps
1. **Bootstrap Project**: Create `pom.xml`, `MediBookApplication.java` and required directory structure under `com.medibook`.
2. **Configuration**: Create `application.properties` with DB, Mail, and JPA configurations. Create `SecurityConfig` and `CorsConfig`.
3. **Domain Entities & Enums**: Implement the 9 JPA entities (`User`, `Specialty`, `Doctor`, `AppointmentSlot`, `Appointment`, `AppointmentArtifact`, `Review`, `Notification`, `DailySummary`) with proper relationships, and all Enums.
4. **Repositories**: Create JPA repository interfaces for all entities.
5. **DTOs**: Implement Request/Response DTOs with `@Valid` annotations.
6. **Exceptions**: Global exception handler (`@RestControllerAdvice`) and custom exception classes.
7. **Services**:
    - `EmailService`, `NotificationService`
    - `AuthService`, `SpecialtyService`
    - `DoctorService`, `AdminService`
    - `AppointmentService` (Implement the core atomic booking flow with `@Lock`).
8. **Controllers**: REST complete APIs with HTTP status codes and Role-based security mappings.
9. **Database Schema & Seed Data**: Create `schema.sql` to initialize tables, insert 10 specialties, 6 doctors, and 72 slots.

## User Review Required

> [!IMPORTANT]
> Since this is a massive code generation request, I will generate all code into a well-structured project repository inside the current workspace. Please confirm if I should create this inside a `medibook` subfolder in your current workspace directory.

> [!WARNING]
> Testing the email functionality will require valid SMTP credentials in `application.properties`. I will place placeholders for the email properties. If you have test credentials (e.g., Mailtrap or Gmail App Passwords), you can configure them later.

## Verification Plan

### Automated Tests
We will rely on Spring Boot's application startup and the initialization of `schema.sql`.

### Manual Verification
1. I will run `mvn clean package` (or equivalent) to ensure the code compiles without errors.
2. Review `schema.sql` execution to ensure seed data is correctly loaded.
