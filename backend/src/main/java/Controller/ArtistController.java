package Controller;

import Pojos.Artist;
import Services.ArtistService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api")
public class ArtistController {

    ArtistService artistService;

    public ResponseEntity<List<Artist>> getAllArtists(){

    }

}
