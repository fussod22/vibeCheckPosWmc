package org.example.backend.Services;

import lombok.RequiredArgsConstructor;
import org.example.backend.Pojos.Event;
import org.example.backend.Pojos.Rating;
import org.example.backend.Repositorys.EventRepository;
import org.example.backend.Repositorys.RatingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;
    private final EventRepository eventRepository;

    public List<Rating> getRatingsByEventId(Long id) {
        List<Rating> ratings = ratingRepository.findByEventId(id);
        return ratings;
    }

    public Rating addRating(Long eventId, Rating rating) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with id " + eventId));

        rating.setEvent(event);
        rating.setCreatedAt(LocalDateTime.now());
        return ratingRepository.save(rating);
    }


}
