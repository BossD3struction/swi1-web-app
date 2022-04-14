package cz.osu.app.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;

@AllArgsConstructor
public class MovieResponse {

    @Getter
    @Setter
    private long id;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private int year;

    @Getter
    @Setter
    private int runningTime;

    @Getter
    @Setter
    private String bannerLink;

    @Getter
    @Setter
    private String about;

    @Getter
    @Setter
    private Collection<Long> genresId;
}
