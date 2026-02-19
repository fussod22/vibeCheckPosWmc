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
    public void initDataBaseArtist(){

        try {
            InputStream inputStream = this.getClass()
                    .getResourceAsStream("/artist.json");

            ObjectMapper objectMapper = new ObjectMapper()
                    .registerModule(new JavaTimeModule());

            List<Artist> artists = objectMapper
                    .readerForListOf(Artist.class)
                    .readValue(inputStream);


            artistRepository.saveAll(artists);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostConstruct
    public void initDataBaseEvent(){
        try {
            InputStream inputStream = this.getClass()
                    .getResourceAsStream("/event.json");

            ObjectMapper objectMapper = new ObjectMapper()
                    .registerModule(new JavaTimeModule());

            List<Event> events = objectMapper
                    .readerForListOf(Event.class)
                    .readValue(inputStream);

            for (Event event : events) {
                List<Artist> realArtists = new ArrayList<>();

                for (Object a : event.getArtists()) {
                    String fullName = (String) a;
                    String[] parts = fullName.split(" ", 2);
                    String firstname = parts[0];
                    String lastname = parts.length > 1 ? parts[1] : "";

                    artistRepository.findByFirstNameAndLastName(firstname, lastname)
                            .ifPresent(realArtists::add);
                }

                event.setArtists(realArtists);
            }

            eventRepository.saveAll(events);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
