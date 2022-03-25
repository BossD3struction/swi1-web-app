package cz.osu.app.controllers;

import cz.osu.app.models.entities.Movie;
import cz.osu.app.models.entities.Review;
import cz.osu.app.models.entities.User;
import cz.osu.app.requests.AddReviewRequest;
import cz.osu.app.responses.MessageResponse;
import cz.osu.app.services.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

@RestController
@AllArgsConstructor
@RequestMapping("/review")
@CrossOrigin()
public class ReviewController {

    private final ReviewService service;

    @GetMapping("/list")
    public List<Review> getReviews() {
        return service.findAllReviews();
    }

    @PostMapping("/create")
    @Secured(value = {"ROLE_USER", "ROLE_ADMIN"})
    public ResponseEntity<?> createReview(@RequestBody Review review) {
        service.save(review);
        return ResponseEntity.ok(new MessageResponse("Review was successfully created!"));
    }

    @PostMapping("/create/angular")
    @Secured(value = {"ROLE_USER", "ROLE_ADMIN"})
    public ResponseEntity<?> createReviewAngular(@Valid @RequestBody AddReviewRequest addReviewRequest) {
        User user = service.getUser(addReviewRequest.getUserId());
        Movie movie = service.getMovie(addReviewRequest.getMovieId());
        Review review = new Review(user, movie, addReviewRequest.getText());
        service.save(review);
        return ResponseEntity.ok(new MessageResponse("Review was successfully saved!"));
    }

    @PutMapping("/{reviewId}/update")
    @Secured(value = {"ROLE_ADMIN"})
    public ResponseEntity<?> updateReview(@RequestBody Review review, @PathVariable("reviewId") long reviewId) {
        Review reviewFromDb = service.findById(reviewId).orElseThrow(() -> new IllegalArgumentException("Review not found for this id :: " + reviewId));
        Objects.requireNonNull(reviewFromDb).setUser(review.getUser());
        Objects.requireNonNull(reviewFromDb).setMovie(review.getMovie());
        Objects.requireNonNull(reviewFromDb).setText(review.getText());
        service.save(reviewFromDb);
        return ResponseEntity.ok(new MessageResponse("Review was successfully updated!"));
    }

    @DeleteMapping("/{reviewId}/delete")
    @Secured(value = {"ROLE_ADMIN"})
    public ResponseEntity<?> deleteReview(@PathVariable("reviewId") long reviewId) {
        service.deleteById(reviewId);
        return ResponseEntity.ok(new MessageResponse("Review was successfully deleted!"));
    }
}
