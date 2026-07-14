package volodea.cv;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import volodea.cv.model.Skill;
import volodea.cv.repository.SkillRepository;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.annotation.DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@DirtiesContext(classMode = AFTER_EACH_TEST_METHOD)
public class SkillControllerTest {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private TestRestTemplate restTemplate;

    @BeforeEach
    public void setup() {
        Skill skill = new Skill("java", "lalala");
        Skill skill3 = new Skill("python", "lalala");
        Skill skill2 = new Skill("sql", "lalala");

        skillRepository.save(skill);
        skillRepository.save(skill3);
        skillRepository.save(skill2);
    }

    @Test
    void shouldReturnAllSkills() {
        ResponseEntity<List<Skill>> response = restTemplate
                .exchange(
                        "/api/skill/"
                        ,  HttpMethod.GET, null
                        , new ParameterizedTypeReference<List<Skill>>() {}
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).hasSize(3);
    }

    @Test
    void shouldReturnSkillById() {
        ResponseEntity<Skill> response = restTemplate.getForEntity(
                "/api/skill/1"
                , Skill.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getId()).isEqualTo(1L);
    }

    @Test
    void shouldReturnNotFoundSkillByUnknowId() {
        ResponseEntity<Skill> response = restTemplate.getForEntity(
                "/api/skill/99999999"
                , Skill.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void shouldCreateNewSkill() {
        Skill skill = new Skill("javaada", "lalalaa");

        HttpEntity<Skill> request = new HttpEntity<>(skill);

        ResponseEntity<Skill> response = restTemplate
                .withBasicAuth("vova", "123")
                .exchange(
                        "/api/skill/"
                        , HttpMethod.POST
                        , request
                        , Skill.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().getName()).isEqualTo(skill.getName());
    }

    @Test
    void shouldReturnForbiddenWhenCreatingWithoutAdminRole() {
        Skill skill = new Skill("javaada", "lalalaa");

        HttpEntity<Skill> request = new HttpEntity<>(skill);

        ResponseEntity<Skill> response = restTemplate
                .withBasicAuth("guest", "guestpass")
                .exchange(
                        "/api/skill/"
                        , HttpMethod.POST
                        , request
                        , Skill.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    @Test
    void shouldDeleteSkill() {
        Skill skill = new Skill("q", "lalala");
        Skill savedSkill = skillRepository.save(skill);

        Long id = savedSkill.getId();

        ResponseEntity<Void> response = restTemplate
                .withBasicAuth("vova", "123")
                .exchange(
                        "/api/skill/" + id
                        , HttpMethod.DELETE
                        , null
                        , Void.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);

        ResponseEntity<Skill> response1 = restTemplate
                .exchange(
                        "/api/skill/" + id
                        , HttpMethod.GET, null
                        , Skill.class
                );

        assertThat(response1.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void shouldReturnNotFoundWhenDeleteSkillWithUnknowId() {
        ResponseEntity<Void> response = restTemplate
                .withBasicAuth("vova", "123")
                .exchange(
                        "/api/skill/" + 999999
                        , HttpMethod.DELETE
                        , null
                        , Void.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void shouldUpdateAnExistingSkill() {
        Skill skill = new Skill("Qazus", "mobravo");
        Skill savedSkill = skillRepository.save(skill);

        long id = savedSkill.getId();

        Skill updatedSkill = new Skill("Qazus2", "mobravo");

        HttpEntity<Skill> request = new HttpEntity<>(updatedSkill);

        ResponseEntity<Skill> response = restTemplate
                .withBasicAuth("vova", "123")
                .exchange(
                        "/api/skill/" + id
                        , HttpMethod.PUT
                        , request
                        , Skill.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        ResponseEntity<Skill> response1 = restTemplate.getForEntity(
                "/api/skill/" + id
                , Skill.class);

        assertThat(response1.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response1.getBody().getName()).isEqualTo(updatedSkill.getName());
    }

    @Test
    void shouldReturnNotFoundWhenUpdateSkillWithUnknowId() {
        Skill updatedSkill = new Skill("Qazus2", "mobravo");

        HttpEntity<Skill> request = new HttpEntity<>(updatedSkill);

        ResponseEntity<Skill> response = restTemplate
                .withBasicAuth("vova", "123")
                .exchange(
                        "/api/skill/" + 99999
                        , HttpMethod.PUT
                        , request
                        , Skill.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
}
