package cz.osu.app.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "review")
@NoArgsConstructor
@RequiredArgsConstructor
public class Review {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_review_id")
    private long id;

    @Getter
    @Setter
    @NonNull
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_id")
    private User user;

    @Getter
    @Setter
    @NonNull
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_movie_id")
    private Movie movie;

    @Getter
    @Setter
    @NonNull
    private String text;

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", user=" + user +
                ", movie=" + movie +
                ", text='" + text + '\'' +
                '}';
    }
}
