package volodea.cv.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import volodea.cv.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
