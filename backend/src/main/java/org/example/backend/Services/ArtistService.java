package org.example.backend.Services;

import org.example.backend.Pojos.Artist;
import org.example.backend.Repositorys.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArtistService {

    private final ArtistRepository artistRepository;

    public List<Artist> getAllArtist(){
        List<Artist> artists = artistRepository.findAll();
        return artists;
    }

    public Artist getArtistById(Long id){

    }
}
