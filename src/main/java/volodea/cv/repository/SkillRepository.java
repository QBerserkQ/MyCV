package volodea.cv.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import volodea.cv.model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
}
