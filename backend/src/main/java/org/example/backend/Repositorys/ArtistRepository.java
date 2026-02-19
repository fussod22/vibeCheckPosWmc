package org.example.backend.Repositorys;

import org.example.backend.Pojos.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {

    Optional<Artist> findFirstByFirstNameAndLastName(String firstName, String lastName);

    Artist getArtistById(Long id);
}