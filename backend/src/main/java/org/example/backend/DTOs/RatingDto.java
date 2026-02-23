package org.example.backend.DTOs;

import lombok.Data;

@Data
public class RatingDto{

    private Long id;
    private int stars;
    private String comment;

    private Long eventId;
}