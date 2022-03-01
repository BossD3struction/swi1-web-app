package cz.osu.app.models.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "user")
@NoArgsConstructor
@RequiredArgsConstructor
public class User {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_user_id")
    private long id;

    @Getter
    @Setter
    @NonNull
    private String username;

    @Getter
    @Setter
    @NonNull
    private String email;

    @Getter
    @Setter
    @NonNull
    private String password;

    @Getter
    @Setter
    @NonNull
    @Column(name = "is_admin")
    private boolean isAdmin;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", nickname='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", isAdmin=" + isAdmin +
                '}';
    }
}
