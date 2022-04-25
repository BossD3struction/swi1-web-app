package cz.osu.app.repositories;

import cz.osu.app.models.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long>, JpaSpecificationExecutor<Movie> {

    void deleteById(long movieId);

    Boolean existsByName(String name);

    Movie getMovieByName(String name);
}
