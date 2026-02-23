package org.example.backend.DTOs;

import lombok.Data;
import java.util.List;

@Data
public class ArtistDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String description;
    private String imageUrl;

    private List<Long> eventIds;
}