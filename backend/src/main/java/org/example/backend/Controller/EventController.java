package org.example.backend.Controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.Pojos.Artist;
import org.example.backend.Pojos.Event;
import org.example.backend.Services.EventService;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping("/artists")
    public ResponseEntity<List<Event>> getAllEvents(){
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }


}
