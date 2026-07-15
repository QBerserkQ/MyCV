package volodea.cv.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import volodea.cv.model.Education;

public interface EducationRepository extends JpaRepository<Education, Long> {
}
