package cz.osu.app.services;

import cz.osu.app.models.entities.Genre;
import cz.osu.app.models.entities.Movie;
import cz.osu.app.models.entities.Review;
import cz.osu.app.repositories.GenreRepository;
import cz.osu.app.repositories.MovieRepository;
import cz.osu.app.repositories.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final GenreRepository genreRepository;
    private final ReviewRepository reviewRepository;

    public List<Movie> findAllMovies() {
        return movieRepository.findAll();
    }

    public void save(Movie movie) {
        movieRepository.save(movie);
    }

    public void deleteById(long movieId) {
        movieRepository.deleteById(movieId);
    }

    public Boolean movieExistsByName(String name) {
        return movieRepository.existsByName(name);
    }

    public Optional<Movie> findById(long id) {
        return movieRepository.findById(id);
    }

    public List<Review> findByMovie(Movie movie) {
        return reviewRepository.findByMovie(movie);
    }


    public Genre getGenre(long genreId) {
        return findAllGenres().stream()
                .filter((q) -> q.getId() == genreId)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown genre id " + genreId));
    }

    public List<Genre> findAllGenres() {
        return genreRepository.findAll();
    }
}
