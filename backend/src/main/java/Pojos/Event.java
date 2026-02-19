package Pojos;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private String location;

    @JsonFormat(pattern = "yyyy-dd-MM")
    private LocalDate eventDate;

    private String imageUrl;

    @ManyToMany
    @JoinTable(
            name="event_artist",
            joinColumns = @JoinColumn(name="event_id"),
            inverseJoinColumns = @JoinColumn(name="artist_id"))
    private List<Artist> artists;



    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Rating> rating;

}
