package org.example.backend.Controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.DTOs.ArtistDto;
import org.example.backend.Services.ArtistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ArtistController {

    private final ArtistService artistService;


    @GetMapping("/artists")
    public ResponseEntity<List<ArtistDto>> getAllArtists() {
        return ResponseEntity.ok(artistService.getAllArtist());
    }


    @GetMapping("/artists/{id}")
    public ResponseEntity<ArtistDto> getArtist(@PathVariable Long id) {
        return ResponseEntity.ok(artistService.getArtistById(id));
    }
}