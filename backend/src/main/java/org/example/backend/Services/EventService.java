package org.example.backend.Services;

import lombok.RequiredArgsConstructor;
import org.example.backend.Repositorys.EventRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
}
