package cz.osu.app.requests;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class AddReviewRequest {

    @Getter
    @Setter
    private long userId;

    @Getter
    @Setter
    private long movieId;

    @Getter
    @Setter
    @NotBlank
    private String text;
}
