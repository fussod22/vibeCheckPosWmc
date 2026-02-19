package org.example.backend.Datenbank;

import org.example.backend.Pojos.Artist;
import org.example.backend.Pojos.Event;
import org.example.backend.Repositorys.ArtistRepository;
import org.example.backend.Repositorys.EventRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
@Component
@RequiredArgsConstructor
public class InitDataBase {

    private final ArtistRepository artistRepository;
    private final EventRepository eventRepository;

    @PostConstruct
    public void initDatabase() {
        try {

            InputStream artistStream = this.getClass().getResourceAsStream("/artist.json");
            ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
            List<Artist> artists = objectMapper.readerForListOf(Artist.class).readValue(artistStream);


            artistRepository.saveAll(artists);

            InputStream eventStream = this.getClass().getResourceAsStream("/event.json");
            List<Event> events = objectMapper.readerForListOf(Event.class).readValue(eventStream);


            for (Event event : events) {
                List<Artist> realArtists = new ArrayList<>();

                if (event.getArtistNames() != null) {
                    for (String fullName : event.getArtistNames()) {
                        String[] parts = fullName.split(" ", 2);
                        String firstName = parts[0];
                        String lastName = parts.length > 1 ? parts[1] : "";

                        artistRepository
                                .findFirstByFirstNameAndLastName(firstName, lastName)
                                .ifPresent(realArtists::add);
                    }
                }

                event.setArtists(realArtists);


                if (event.getRatings() != null) {
                    event.getRatings().forEach(rating -> rating.setEvent(event));
                }
            }

            eventRepository.saveAll(events);

        } catch (Exception e) {
            throw new RuntimeException("Fehler beim Initialisieren der Datenbank", e);
        }
    }
}