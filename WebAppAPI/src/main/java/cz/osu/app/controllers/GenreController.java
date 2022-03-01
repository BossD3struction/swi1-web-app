package cz.osu.app.controllers;

import cz.osu.app.models.entities.Genre;
import cz.osu.app.services.GenreService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@AllArgsConstructor
@RequestMapping("/genre")
@CrossOrigin(origins = "http://localhost:4200")
public class GenreController {

    private final GenreService service;

    @GetMapping("/list")
    public List<Genre> getGenres() {
        return service.findAllGenres();
    }

    @PostMapping("/create")
    @Secured(value = {"ROLE_ADMIN"})
    public void createGenre(@RequestBody Genre genre) {
        service.save(genre);
    }

    @PutMapping("/{genreId}/update")
    @Secured(value = {"ROLE_ADMIN"})
    public void updateGenre(@RequestBody Genre genre, @PathVariable("genreId") long genreId) {
        Genre genreFromDb = service.findById(genreId).orElseThrow(() -> new IllegalArgumentException("Genre not found for this id :: " + genreId));
        Objects.requireNonNull(genreFromDb).setName(genre.getName());
        service.save(genreFromDb);
    }

    @DeleteMapping("/{genreId}/delete")
    @Secured(value = {"ROLE_ADMIN"})
    public void deleteGenre(@PathVariable("genreId") long genreId) {
        service.deleteById(genreId);
    }
}
