package cz.osu.app.services;

import cz.osu.app.models.entities.Movie;
import cz.osu.app.models.entities.Review;
import cz.osu.app.models.entities.User;
import cz.osu.app.repositories.MovieRepository;
import cz.osu.app.repositories.ReviewRepository;
import cz.osu.app.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;

    public List<Review> findAllReviews() {
        return reviewRepository.findAll();
    }

    public void save(Review review) {
        reviewRepository.save(review);
    }

    public void deleteById(long reviewId) {
        reviewRepository.deleteById(reviewId);
    }

    public Optional<Review> findById(long id) {
        return reviewRepository.findById(id);
    }


    public User getUser(long userId) {
        return findAllUsers().stream()
                .filter((q) -> q.getId() == userId)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown user id " + userId));
    }

    public Movie getMovie(long movieId) {
        return findAllMovies().stream()
                .filter((q) -> q.getId() == movieId)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown movie id " + movieId));
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public List<Movie> findAllMovies() {
        return movieRepository.findAll();
    }
}
