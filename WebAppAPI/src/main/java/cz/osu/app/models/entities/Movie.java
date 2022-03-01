package cz.osu.app.models.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "movie")
@NoArgsConstructor
@RequiredArgsConstructor
public class Movie {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_movie_id")
    private long id;

    @Getter
    @Setter
    @NonNull
    private String name;

    @Getter
    @Setter
    @NonNull
    private int year;

    @Getter
    @Setter
    @NonNull
    @Column(name = "running_time")
    private int runningTime;

    @Getter
    @Setter
    @NonNull
    @Column(name = "banner_link")
    private String bannerLink;

    @Getter
    @Setter
    @NonNull
    @Column(columnDefinition = "TEXT")
    private String about;

    @Getter
    @Setter
    @NonNull
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "Movie_has_Genre",
            joinColumns = @JoinColumn(name = "pk_fk_movie_id", referencedColumnName = "pk_movie_id"),
            inverseJoinColumns = @JoinColumn(name = "pk_fk_genre_id", referencedColumnName = "pk_genre_id")
    )
    private Collection<Genre> genres;

    public Movie(String name, int year, int runningTime, String bannerLink, String about) {

        this.name = name;
        this.year = year;
        this.runningTime = runningTime;
        this.bannerLink = bannerLink;
        this.about = about;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", year=" + year +
                ", runningTime=" + runningTime +
                ", bannerLink='" + bannerLink + '\'' +
                ", about='" + about + '\'' +
                ", genres=" + genres +
                '}';
    }
}
