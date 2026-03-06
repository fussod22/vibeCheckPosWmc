package org.example.backend.Controller;

import jakarta.servlet.ServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.backend.DTOs.EventDto;
import org.example.backend.Services.EventService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping("/events")
    public ResponseEntity<List<EventDto>> getAllEvents(){
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/events/{id}")
    public ResponseEntity<EventDto> getEvent(@PathVariable Long id){
        return ResponseEntity.ok(eventService.getEvent(id));
    }

    @GetMapping("/events/artist/{id}")
    public ResponseEntity<List<EventDto>> getEventByArtist(@PathVariable Long id){
        return ResponseEntity.ok(eventService.getEventByArtistId(id));
    }

    @GetMapping("/events_pageable")
    public ResponseEntity<Page<EventDto>> getEventPaged(
            @RequestParam Integer page,
            @RequestParam Integer size,
            @RequestParam String orderBy,
            @RequestParam String sortBy
            ){

        Page<EventDto> eventDtos = eventService.getEventPaged(page,size,orderBy, sortBy);
        return ResponseEntity.status(200).body(eventDtos);
    }
}