package cz.osu.app.repositories;

import cz.osu.app.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    void deleteById(long userId);

    User findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
