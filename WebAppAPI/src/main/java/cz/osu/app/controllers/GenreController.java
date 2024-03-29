package cz.osu.app.controllers;

import cz.osu.app.models.entities.Genre;
import cz.osu.app.responses.MessageResponse;
import cz.osu.app.services.GenreService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@AllArgsConstructor
@RequestMapping("/genre")
@CrossOrigin()
public class GenreController {

    private final GenreService service;

    @GetMapping("/list")
    public List<Genre> getGenres() {
        return service.findAllGenres();
    }

    @PostMapping("/create")
    @Secured(value = {"ROLE_ADMIN"})
    public ResponseEntity<?> createGenre(@RequestBody Genre genre) {
        if (service.genreExistsByName(genre.getName())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Genre is already in database!"));
        } else {
            service.save(genre);
            return ResponseEntity.ok(new MessageResponse("Genre was successfully created!"));
        }
    }

    @PutMapping("/{genreId}/update")
    @Secured(value = {"ROLE_ADMIN"})
    public ResponseEntity<?> updateGenre(@RequestBody Genre genre, @PathVariable("genreId") long genreId) {
        if (service.genreExistsByName(genre.getName())
                && genre.getId() != service.getGenreByName(genre.getName()).getId()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Genre is already in database!"));
        } else {
            Genre genreFromDb = service.findById(genreId).orElseThrow(() -> new IllegalArgumentException("Genre not found for this id :: " + genreId));
            Objects.requireNonNull(genreFromDb).setName(genre.getName());
            service.save(genreFromDb);
            return ResponseEntity.ok(new MessageResponse("Genre was successfully updated!"));
        }
    }

    @DeleteMapping("/{genreId}/delete")
    @Secured(value = {"ROLE_ADMIN"})
    public ResponseEntity<?> deleteGenre(@PathVariable("genreId") long genreId) {
        service.deleteById(genreId);
        return ResponseEntity.ok(new MessageResponse("Genre was successfully deleted!"));
    }

    @GetMapping("/{genreId}")
    @Secured(value = {"ROLE_ADMIN"})
    public Genre getGenreById(@PathVariable("genreId") long genreId) {
        return service.findById(genreId).orElseThrow(() -> new IllegalArgumentException("Genre not found for this id :: " + genreId));
    }
}

