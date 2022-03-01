package cz.osu.app.controllers;

import cz.osu.app.models.entities.User;
import cz.osu.app.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService service;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/list")
    @Secured(value = {"ROLE_ADMIN"})
    public List<User> getUsers() {
        return service.findAllUsers();
    }

    @PostMapping("/create")
    @Secured(value = {"ROLE_ADMIN"})
    public void createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        service.save(user);
    }

    @PutMapping("/{userId}/update")
    @Secured(value = {"ROLE_ADMIN"})
    public void updateUser(@RequestBody User user, @PathVariable("userId") long userId) {
        User userFromDb = service.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found for this id :: " + userId));
        Objects.requireNonNull(userFromDb).setUsername(user.getUsername());
        Objects.requireNonNull(userFromDb).setEmail(user.getEmail());
        Objects.requireNonNull(userFromDb).setPassword(passwordEncoder.encode(user.getPassword()));
        Objects.requireNonNull(userFromDb).setAdmin(user.isAdmin());
        service.save(userFromDb);
    }

    @DeleteMapping("/{userId}/delete")
    @Secured(value = {"ROLE_ADMIN"})
    public void deleteUser(@PathVariable("userId") long userId) {
        service.deleteById(userId);
    }
}
