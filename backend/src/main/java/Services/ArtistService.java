package Services;

import Repositorys.ArtistRepository;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class ArtistService {

    ArtistRepository artistRepository; 
}
