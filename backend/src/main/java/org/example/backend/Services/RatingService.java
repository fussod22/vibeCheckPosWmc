package org.example.backend.Services;

import lombok.RequiredArgsConstructor;
import org.example.backend.Repositorys.RatingRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;
}
