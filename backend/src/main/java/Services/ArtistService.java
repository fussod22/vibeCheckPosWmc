package Services;

import Repositorys.ArtistRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
@RequiredArgsConstructor
public class ArtistService {

    ArtistRepository artistRepository;
}
