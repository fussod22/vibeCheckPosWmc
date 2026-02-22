package org.example.backend.Pojos;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.Pojos.Artist;
import org.example.backend.Pojos.Rating;

import java.time.LocalDate;
import java.util.List;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private String location;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate eventDate;

    private String imageUrl;

    @ManyToMany
    @JoinTable(
            name = "event_artist",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "artist_id"))
    @JsonIgnore
    @JsonManagedReference
    private List<Artist> artists;

    @Transient
    @JsonProperty("artists")
    private List<String> artistNames;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    @JsonProperty("ratings")
    @JsonManagedReference
    private List<Rating> ratings;
}