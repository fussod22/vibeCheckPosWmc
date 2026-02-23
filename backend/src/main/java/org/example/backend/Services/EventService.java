package org.example.backend.Services;

import lombok.RequiredArgsConstructor;
import org.example.backend.DTOs.EventDto;
import org.example.backend.DTOs.RatingDto;
import org.example.backend.Pojos.Event;
import org.example.backend.Repositorys.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<EventDto> getAllEvents() {
        return eventRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }


    public EventDto getEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event nicht gefunden: " + id));

        return mapToDto(event);
    }


    public List<EventDto> getEventByArtistId(Long id) {
        return eventRepository.findByArtists_Id(id)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    private EventDto mapToDto(Event event) {

        EventDto dto = new EventDto();

        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setLocation(event.getLocation());
        dto.setEventDate(event.getEventDate());
        dto.setImageUrl(event.getImageUrl());

        // Artist IDs
        dto.setArtistIds(
                event.getArtists()
                        .stream()
                        .map(artist -> artist.getId())
                        .toList()
        );

        List<RatingDto> ratingDtos = event.getRatings()
                .stream()
                .map(rating -> {
                    RatingDto r = new RatingDto();
                    r.setId(rating.getId());
                    r.setStars(rating.getStars());
                    r.setComment(rating.getComment());
                    r.setEventId(event.getId());
                    return r;
                })
                .toList();

        dto.setRatings(ratingDtos);

        return dto;
    }
}