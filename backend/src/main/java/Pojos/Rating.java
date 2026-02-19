package Pojos;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Integer stars;

    private String comment;

    @JsonFormat(pattern = "yyyy-dd-MM hh:mm:ss")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name="event_id")
    private Event event;
}


