package volodea.cv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import volodea.cv.model.Skill;
import volodea.cv.repository.SkillRepository;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/skill/")
public class SkillController {

    @Autowired
    private SkillRepository skillRepository;

    @GetMapping
    public ResponseEntity<List<Skill>> findAll(
            @PageableDefault(size = 3, sort = "name") Pageable peagable) {
        Page<Skill> page = skillRepository.findAll(peagable);

        return ResponseEntity.ok(page.getContent());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Skill> findById(@PathVariable Long id) {
        return skillRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Skill> save(@RequestBody Skill skill) {
        Skill savedSkill = skillRepository.save(skill);

        URI link = URI.create("/api/skill/" + savedSkill.getId());

        return ResponseEntity.created(link).body(savedSkill);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Skill skill = skillRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );

        skillRepository.delete(skill);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> update(@PathVariable Long id, @RequestBody Skill skill) {
        Skill skillToUpdate = skillRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );

        skillToUpdate.setName(skill.getName());
        skillToUpdate.setLevel(skill.getLevel());

        return ResponseEntity.ok(skillRepository.save(skillToUpdate));
    }
}
