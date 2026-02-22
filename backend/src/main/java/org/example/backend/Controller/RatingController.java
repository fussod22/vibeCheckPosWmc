package org.example.backend.Controller;


import lombok.RequiredArgsConstructor;
import org.example.backend.Pojos.Rating;
import org.example.backend.Services.RatingService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Rating>> getRatingsByEvent(@PathVariable Long eventId) {
        List<Rating> ratings = ratingService.getRatingsByEventId(eventId);
        return ResponseEntity.ok(ratings);
    }
}
