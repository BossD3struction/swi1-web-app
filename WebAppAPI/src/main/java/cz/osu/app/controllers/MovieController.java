package cz.osu.app.controllers;

import cz.osu.app.models.entities.Genre;
import cz.osu.app.models.entities.Movie;
import cz.osu.app.models.entities.Review;
import cz.osu.app.requests.AddMovieRequest;
import cz.osu.app.requests.UpdateMovieRequest;
import cz.osu.app.responses.MessageResponse;
import cz.osu.app.responses.MovieResponse;
import cz.osu.app.services.MovieService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@RestController
@AllArgsConstructor
@RequestMapping("/movie")
@CrossOrigin()
public class MovieController {

    private final MovieService service;

    @GetMapping("/list")
    public List<Movie> getMovies() {
        return service.findAllMovies();
    }

    @PostMapping("/create")
    @Secured(value = {"ROLE_ADMIN"})
    public ResponseEntity<?> createMovie(@RequestBody Movie movie) {
        service.save(movie);
        return ResponseEntity.ok(new MessageResponse("Movie was successfully created!"));
    }

    @PostMapping("/create/angular")
    @Secured(value = {"ROLE_ADMIN"})
    public ResponseEntity<?> createMovieAngular(@Valid @RequestBody AddMovieRequest addMovieRequest) {
        if (service.movieExistsByName(addMovieRequest.getName())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Movie is already in database!"));
        } else {
            if (addMovieRequest.getGenresId() != null) {
                List<Genre> genres = new ArrayList<>();
                for (long genreId : addMovieRequest.getGenresId()) {
                    genres.add(service.getGenre(genreId));
                }
                Movie movie = new Movie(addMovieRequest.getName(), addMovieRequest.getYear(),
                        addMovieRequest.getRunningTime(), addMovieRequest.getBannerLink(), addMovieRequest.getAbout(), genres);
                service.save(movie);
            } else {
                Movie movie = new Movie(addMovieRequest.getName(), addMovieRequest.getYear(),
                        addMovieRequest.getRunningTime(), addMovieRequest.getBannerLink(), addMovieRequest.getAbout());
                service.save(movie);
            }
            return ResponseEntity.ok(new MessageResponse("Movie was successfully saved!"));
        }
    }

    @PutMapping("/{movieId}/update")
    @Secured(value = {"ROLE_ADMIN"})
    public ResponseEntity<?> updateMovie(@RequestBody Movie movie, @PathVariable("movieId") long movieId) {
        Movie movieFromDb = service.findById(movieId).orElseThrow(() -> new IllegalArgumentException("Movie not found for this id :: " + movieId));
        updateValues(movie, movieFromDb);
        service.save(movieFromDb);
        return ResponseEntity.ok(new MessageResponse("Movie was successfully updated!"));
    }

    @PutMapping("/update")
    @Secured(value = {"ROLE_ADMIN"})
    public ResponseEntity<?> updateMovieAngular(@Valid @RequestBody UpdateMovieRequest updateMovieRequest) {
        if (service.movieExistsByName(updateMovieRequest.getName())
                && updateMovieRequest.getId() != service.getMovieByName(updateMovieRequest.getName()).getId()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Movie is already in database!"));
        } else {
            Movie movieFromDb = service.findById(updateMovieRequest.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Movie not found for this id :: " + updateMovieRequest.getId()));
            if (updateMovieRequest.getGenresId() != null) {
                List<Genre> genres = new ArrayList<>();
                for (long genreId : updateMovieRequest.getGenresId()) {
                    genres.add(service.getGenre(genreId));
                }
                updateValuesAngular(updateMovieRequest, movieFromDb);
                Objects.requireNonNull(movieFromDb).setGenres(genres);
            } else {
                updateValuesAngular(updateMovieRequest, movieFromDb);
            }
            service.save(movieFromDb);
            return ResponseEntity.ok(new MessageResponse("Movie was successfully updated!"));
        }
    }

    @DeleteMapping("/{movieId}/delete")
    @Secured(value = {"ROLE_ADMIN"})
    public ResponseEntity<?> deleteMovie(@PathVariable("movieId") long movieId) {
        service.deleteById(movieId);
        return ResponseEntity.ok(new MessageResponse("Movie was successfully deleted!"));
    }

    @GetMapping("/{movieId}/reviews")
    public List<Review> getMovieReviews(@PathVariable("movieId") long movieId) {
        Movie movie = service.findById(movieId).orElseThrow(() -> new IllegalArgumentException("Movie not found for this id :: " + movieId));
        return service.findByMovie(movie);
    }

    @GetMapping("/{movieId}")
    public MovieResponse getMovie(@PathVariable("movieId") long movieId) {
        Movie movie = service.findById(movieId).orElseThrow(() -> new IllegalArgumentException("Movie not found for this id :: " + movieId));
        List<Genre> genres = new ArrayList<>(movie.getGenres());
        Collection<Long> genreIds = new ArrayList<>();
        for (Genre genre : genres) {
            genreIds.add(genre.getId());
        }
        return new MovieResponse(
                movie.getId(),
                movie.getName(),
                movie.getYear(),
                movie.getRunningTime(),
                movie.getBannerLink(),
                movie.getAbout(),
                genreIds
        );
    }

    private void updateValues(@RequestBody Movie movie, Movie movieFromDb) {
        Objects.requireNonNull(movieFromDb).setName(movie.getName());
        Objects.requireNonNull(movieFromDb).setYear(movie.getYear());
        Objects.requireNonNull(movieFromDb).setRunningTime(movie.getRunningTime());
        Objects.requireNonNull(movieFromDb).setBannerLink(movie.getBannerLink());
        Objects.requireNonNull(movieFromDb).setAbout(movie.getAbout());
        Objects.requireNonNull(movieFromDb).setGenres(movie.getGenres());
    }

    private void updateValuesAngular(@Valid @RequestBody UpdateMovieRequest updateMovieRequest, Movie movieFromDb) {
        Objects.requireNonNull(movieFromDb).setName(updateMovieRequest.getName());
        Objects.requireNonNull(movieFromDb).setYear(updateMovieRequest.getYear());
        Objects.requireNonNull(movieFromDb).setRunningTime(updateMovieRequest.getRunningTime());
        Objects.requireNonNull(movieFromDb).setBannerLink(updateMovieRequest.getBannerLink());
        Objects.requireNonNull(movieFromDb).setAbout(updateMovieRequest.getAbout());
    }
}
