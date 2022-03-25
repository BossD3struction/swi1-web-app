package cz.osu.app.controllers;

import cz.osu.app.models.entities.User;
import cz.osu.app.responses.MessageResponse;
import cz.osu.app.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
@CrossOrigin()
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
    public ResponseEntity<?> createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        service.save(user);
        return ResponseEntity.ok(new MessageResponse("User was successfully created!"));
    }

    @PutMapping("/{userId}/update")
    @Secured(value = {"ROLE_ADMIN"})
    public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable("userId") long userId) {
        User userFromDb = service.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found for this id :: " + userId));
        Objects.requireNonNull(userFromDb).setUsername(user.getUsername());
        Objects.requireNonNull(userFromDb).setEmail(user.getEmail());
        Objects.requireNonNull(userFromDb).setPassword(passwordEncoder.encode(user.getPassword()));
        Objects.requireNonNull(userFromDb).setAdmin(user.isAdmin());
        service.save(userFromDb);
        return ResponseEntity.ok(new MessageResponse("User was successfully updated!"));
    }

    @DeleteMapping("/{userId}/delete")
    @Secured(value = {"ROLE_ADMIN"})
    public ResponseEntity<?> deleteUser(@PathVariable("userId") long userId) {
        service.deleteById(userId);
        return ResponseEntity.ok(new MessageResponse("User was successfully deleted!"));
    }
}
