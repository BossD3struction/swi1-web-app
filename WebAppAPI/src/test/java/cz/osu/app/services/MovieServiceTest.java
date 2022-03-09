package cz.osu.app.services;

import cz.osu.app.repositories.GenreRepository;
import cz.osu.app.repositories.MovieRepository;
import cz.osu.app.repositories.ReviewRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
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
    void movieExistsByName() {

        String movieName = "MovieIsInDatabase";
        when(movieRepository.existsByName(anyString())).thenReturn(true);
        Boolean result = movieService.movieExistsByName(movieName);
        assertTrue(result, "Movie exists in db");
    }

    @Test
    void movieDoesntExistByName() {

        String movieName = "MovieIsNotInDatabase";
        when(movieRepository.existsByName(anyString())).thenReturn(false);
        Boolean result = movieService.movieExistsByName(movieName);
        assertFalse(result, "Movie doesn't exist in db");
    }
}