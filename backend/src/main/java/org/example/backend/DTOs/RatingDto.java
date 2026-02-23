package org.example.backend.DTOs;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RatingDto {

    private Long id;
    private int stars;
    private String comment;
    private LocalDateTime createdAt;
    private Long eventId;
}