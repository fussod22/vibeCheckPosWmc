package org.example.backend.Controller;


import lombok.RequiredArgsConstructor;
import org.example.backend.Services.RatingService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;
}
