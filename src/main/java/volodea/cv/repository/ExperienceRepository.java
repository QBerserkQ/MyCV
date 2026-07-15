package volodea.cv.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import volodea.cv.model.Experience;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
}
