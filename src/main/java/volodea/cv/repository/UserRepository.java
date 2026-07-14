package volodea.cv.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import volodea.cv.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByName(String username);
}
