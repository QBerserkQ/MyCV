package volodea.cv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import volodea.cv.model.Experience;
import volodea.cv.repository.ExperienceRepository;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/exp/")
public class ExperienceController {

    private final ExperienceRepository experienceRepository;

    public ExperienceController(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @GetMapping
    public ResponseEntity<List<Experience>> getAllExperiences() {
        return ResponseEntity.ok(experienceRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Experience> findById(@PathVariable Long id) {
        return experienceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Experience> createExperience(@RequestBody Experience experience) {
        Experience newExperience = experienceRepository.save(experience);

        URI link = URI.create("/api/exp/" + newExperience.getId());

        return ResponseEntity.created(link).body(newExperience);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
                );

        experienceRepository.delete(experience);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Experience> updateExperience(@PathVariable Long id, @RequestBody Experience experience) {
        Experience updatedExperience = experienceRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
                );

        updatedExperience.setPosition(experience.getPosition());
        updatedExperience.setCompany(experience.getCompany());
        updatedExperience.setEndDate(experience.getEndDate());
        updatedExperience.setStartDate(experience.getStartDate());
        updatedExperience.setDescription(experience.getDescription());

        return ResponseEntity.ok(experienceRepository.save(updatedExperience));
    }
}
