package Datenbank;

import Pojos.Artist;
import Pojos.Event;
import Repositorys.ArtistRepository;
import Repositorys.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import javax.xml.stream.util.EventReaderDelegate;
import java.io.InputStream;
import java.util.List;

@Component
@RequiredArgsConstructor
public class InitDataBase {

    private final ArtistRepository artistRepository;
    private final EventRepository eventRepository;
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

    public void initDataBaseEvent(){

        try {
            InputStream inputStream = this.getClass()
                    .getResourceAsStream("/event.json");

            ObjectMapper objectMapper = new ObjectMapper()
                    .registerModule(new JavaTimeModule());

            List<Event> events = objectMapper
                    .readerForListOf(Event.class)
                    .readValue(inputStream);


            eventRepository.saveAll(events);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
