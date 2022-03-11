package cz.osu.app.services;

import cz.osu.app.repositories.GenreRepository;
import cz.osu.app.repositories.MovieRepository;
import cz.osu.app.repositories.ReviewRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MovieServiceTest {

    private MovieRepository movieRepository;
    private GenreRepository genreRepository;
    private ReviewRepository reviewRepository;
    private MovieService movieService;

    @BeforeEach
    void setUp() {
        movieRepository = mock(MovieRepository.class);
        genreRepository = mock(GenreRepository.class);
        reviewRepository = mock(ReviewRepository.class);
        movieService = new MovieService(movieRepository, genreRepository, reviewRepository);
    }

    @Test
    void movieExistsByNameTrue() {

        String movieName = "Dune";
        when(movieRepository.existsByName(movieName)).thenReturn(true);
        Boolean result = movieService.movieExistsByName(movieName);
        assertTrue(result, "Movie already exists in database!");
    }

    @Test
    void movieExistByNameFalse() {

        String movieName = "Dune";
        when(movieRepository.existsByName(movieName)).thenReturn(false);
        Boolean result = movieService.movieExistsByName(movieName);
        assertFalse(result, "Movie doesn't exist in database, yet!");
    }
}
