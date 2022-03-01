package cz.osu.app.requests;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

public class RegisterRequest {

    @Getter
    @Setter
    @NotBlank
    @Size(min = 3, max = 45)
    private String username;

    @Getter
    @Setter
    @NotBlank
    @Size(max = 90)
    @Email
    private String email;

    @Getter
    @Setter
    @NotBlank
    @Size(min = 6, max = 130)
    private String password;

    @Getter
    @Setter
    private Set<String> role;
}
