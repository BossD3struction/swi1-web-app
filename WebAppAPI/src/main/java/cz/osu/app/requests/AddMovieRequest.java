package cz.osu.app.requests;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class AddMovieRequest {

    @Getter
    @Setter
    @NotBlank
    private String name;

    @Getter
    @Setter
    private int year;

    @Getter
    @Setter
    private int runningTime;

    @Getter
    @Setter
    @NotBlank
    private String bannerLink;

    @Getter
    @Setter
    private String about;

    @Getter
    @Setter
    private long[] genresId;
}
