package org.example.backend.Services;

import lombok.RequiredArgsConstructor;
import org.example.backend.DTOs.RatingDto;
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

    public List<RatingDto> getRatingsByEventId(Long eventId) {
        return ratingRepository.findByEventId(eventId)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public RatingDto addRating(Long eventId, RatingDto ratingDto) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with id " + eventId));

        Rating rating = new Rating();
        rating.setStars(ratingDto.getStars());
        rating.setComment(ratingDto.getComment());
        rating.setCreatedAt(LocalDateTime.now());
        rating.setEvent(event);

        Rating saved = ratingRepository.save(rating);

        return mapToDto(saved);
    }

    private RatingDto mapToDto(Rating rating) {

        RatingDto dto = new RatingDto();

        dto.setId(rating.getId());
        dto.setStars(rating.getStars());
        dto.setComment(rating.getComment());
        dto.setCreatedAt(rating.getCreatedAt());
        dto.setEventId(rating.getEvent().getId());

        return dto;
    }
}