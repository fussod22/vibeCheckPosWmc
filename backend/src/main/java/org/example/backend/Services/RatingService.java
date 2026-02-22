package org.example.backend.Services;

import lombok.RequiredArgsConstructor;
import org.example.backend.Pojos.Rating;
import org.example.backend.Repositorys.EventRepository;
import org.example.backend.Repositorys.RatingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;
    private final EventRepository eventRepository;

    public List<Rating> getRatingsByEvent(Long id) {
        List<Rating> ratings = ratingRepository.findByEventId(id);
        return ratings;
    }
}
