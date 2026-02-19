package Services;

import Pojos.Artist;
import Repositorys.ArtistRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@NoArgsConstructor
@RequiredArgsConstructor
public class ArtistService {

    ArtistRepository artistRepository;

    public List<Artist> getAllArtist(){
        List<Artist> artists =
    }
}
