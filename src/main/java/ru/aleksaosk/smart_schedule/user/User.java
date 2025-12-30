package ru.aleksaosk.smart_schedule.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "users", schema = "public")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "user name cannot be empty")
    @Size(min = 2, max = 100, message = "name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "login cannot be empty")
    @Size(min = 3, max = 50, message = "login must be between 3 and 50 characters")
    @Column(unique = true)
    private String login;

    @NotBlank(message = "password name cannot be empty")
    @Size(min = 7, max = 50, message = "password be between 2 and 100 characters")
    private String password;

    @Email(message = "email should be valid")
    @NotBlank(message = "email cannot be empty")
    @Size(max = 254, message = "email cannot exceed 254 characters")
    @Column(unique = true)
    private String email;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime created;
}
