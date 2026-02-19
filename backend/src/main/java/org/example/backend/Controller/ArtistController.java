package org.example.backend.Controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.Pojos.Artist;
import org.example.backend.Services.ArtistService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class ArtistController {

    private final ArtistService artistService;

    @GetMapping("/artists")
    public ResponseEntity<List<Artist>> getAllArtists(){
        List<Artist> artists = artistService.getAllArtist();
        return ResponseEntity.ok(artists);
    }

    @GetMapping("/artists")
    public ResponseEntity<Artist> getArtist(){

    }

}
