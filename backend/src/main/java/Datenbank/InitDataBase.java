package Datenbank;

import Pojos.Artist;
import Repositorys.ArtistRepository;
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
    public void initDataBase(){

        try {
            InputStream inputStream = this.getClass()
                    .getResourceAsStream("/artist.json");

            ObjectMapper objectMapper = new ObjectMapper()
                    .registerModule(new JavaTimeModule());

            List<Artist> students = objectMapper
                    .readerForListOf(Artist.class)
                    .readValue(inputStream);


            artistRepository.saveAll(students);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
