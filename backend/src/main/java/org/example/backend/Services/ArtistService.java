package org.example.backend.Services;

import lombok.RequiredArgsConstructor;
import org.example.backend.DTOs.ArtistDto;
import org.example.backend.Pojos.Artist;
import org.example.backend.Repositorys.ArtistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArtistService {

    private final ArtistRepository artistRepository;


    public List<ArtistDto> getAllArtist() {
        return artistRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }


    public ArtistDto getArtistById(Long id) {
        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artist not found"));

        return mapToDto(artist);
    }


    private ArtistDto mapToDto(Artist artist) {

        ArtistDto dto = new ArtistDto();

        dto.setId(artist.getId());
        dto.setFirstName(artist.getFirstName());
        dto.setLastName(artist.getLastName());
        dto.setDescription(artist.getDescription());
        dto.setImageUrl(artist.getImageUrl());

        if (artist.getEvents() != null) {
            dto.setEventIds(
                    artist.getEvents()
                            .stream()
                            .map(event -> event.getId())
                            .toList()
            );
        }

        return dto;
    }
}