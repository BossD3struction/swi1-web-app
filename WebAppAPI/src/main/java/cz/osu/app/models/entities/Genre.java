package cz.osu.app.models.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "genre")
@NoArgsConstructor
@RequiredArgsConstructor
public class Genre {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_genre_id")
    private long id;

    @Getter
    @Setter
    @NonNull
    private String name;

    @Getter
    @Setter
    @JsonBackReference
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "genres")
    private Collection<Movie> movies;

    @Override
    public String toString() {
        return "Genre{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", movies=" + movies +
                '}';
    }
}
