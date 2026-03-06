package org.example.backend.Controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.DTOs.RatingDto;
import org.example.backend.Services.RatingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;


    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<RatingDto>> getRatingsByEvent(@PathVariable Long eventId) {
        return ResponseEntity.ok(ratingService.getRatingsByEventId(eventId));
    }


    @PostMapping("/{eventId}")
    public ResponseEntity<RatingDto> addRating(
            @PathVariable Long eventId,
            @RequestBody RatingDto ratingDto) {

        RatingDto saved = ratingService.addRating(eventId, ratingDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}