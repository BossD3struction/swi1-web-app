package cz.osu.app.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
public class MessageResponse {

    @Getter
    @Setter
    private String message;
}
