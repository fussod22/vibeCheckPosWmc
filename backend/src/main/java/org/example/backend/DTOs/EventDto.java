package org.example.backend.DTOs;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class EventDto {

    private Long id;
    private String title;
    private String location;
    private LocalDate eventDate;
    private String imageUrl;

    private List<Long> artistIds;

    private Double averageRating;
}