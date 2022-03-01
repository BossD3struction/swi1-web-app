package cz.osu.app.repositories;

import cz.osu.app.models.entities.Movie;
import cz.osu.app.models.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>, JpaSpecificationExecutor<Review> {

    void deleteById(long reviewId);

    List<Review> findByMovie(Movie movie);
}
