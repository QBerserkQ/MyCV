package volodea.cv.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import volodea.cv.model.Education;
import volodea.cv.repository.EducationRepository;


import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/education/")
public class EducationController {

    private final EducationRepository educationRepository;

    public EducationController(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    @GetMapping
    public ResponseEntity<List<Education>> getAllEducation() {
        return ResponseEntity.ok(educationRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Education> findById(@PathVariable Long id) {
        return educationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Education> createEducation(@RequestBody Education education) {
        Education newEducation = educationRepository.save(education);

        URI link = URI.create("/api/education/" + newEducation.getId());

        return ResponseEntity.created(link).body(newEducation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        Education education = educationRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
                );

        educationRepository.delete(education);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Education> updateEducation(@PathVariable Long id, @RequestBody Education education) {
        Education updatedEducation = educationRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
                );

        updatedEducation.setInstitution(education.getInstitution());
        updatedEducation.setDescription(education.getDescription());
        updatedEducation.setSpeciality(education.getSpeciality());
        updatedEducation.setCompletedDate(education.getCompletedDate());

        return ResponseEntity.ok(educationRepository.save(updatedEducation));
    }
}
