package org.example.backend.Repositorys;

import org.example.backend.Pojos.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Event findEventById(Long id);


    List<Event> findByArtists_Id(Long id);
}
