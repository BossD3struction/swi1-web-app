package cz.osu.app.services;

import cz.osu.app.models.entities.Genre;
import cz.osu.app.repositories.GenreRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GenreService {

    private final GenreRepository genreRepository;

    public List<Genre> findAllGenres() {
        return genreRepository.findAll();
    }

    public void save(Genre genre) {
        genreRepository.save(genre);
    }

    public void deleteById(long genreId) {
        genreRepository.deleteById(genreId);
    }

    public Optional<Genre> findById(long id) {
        return genreRepository.findById(id);
    }
}
