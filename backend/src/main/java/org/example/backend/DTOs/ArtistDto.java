package org.example.backend.DTOs;

import lombok.Data;
import java.util.List;

@Data
public class ArtistDto{

    private Long id;
    private String name;
    private String description;
    private String imageUrl;

    // nur Event IDs, KEINE ganzen Events!
    private List<Long> eventIds;
}
