package org.example.backend.Repositorys;

import org.example.backend.Pojos.Artist;
import org.hibernate.annotations.processing.SQL;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {

   Optional<Artist> findFirstByFirstNameAndLastName(String firstName, String lastName);
   //@Query("SELECT a.id FROM Artist a WHERE a.lastName = :lastName AND a.firstName = :firstName")
   //Long getArtistByFirstNameAndLastName(//       @Param("firstName") String firstName,
   //   @Param("lastName") String lastName
   //);

    Artist getArtistById(Long id);
}