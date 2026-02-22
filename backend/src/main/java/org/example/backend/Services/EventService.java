package org.example.backend.Services;

import lombok.RequiredArgsConstructor;
import org.example.backend.Pojos.Event;
import org.example.backend.Repositorys.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<Event> getALlEvents(){
        List<Event> events = eventRepository.findAll();
        return events;
    }
}
