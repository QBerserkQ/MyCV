package volodea.cv;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import volodea.cv.model.Experience;
import volodea.cv.repository.ExperienceRepository;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.annotation.DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@DirtiesContext(classMode = AFTER_EACH_TEST_METHOD)
public class ExperienceControllerTest {

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private TestRestTemplate restTemplate;

    @BeforeEach
    public void setup() {
        LocalDate now = LocalDate.now();
        Experience experience = new Experience("Java Backend", "UTM", now, now, "descrip");
        Experience experience2 = new Experience("Java Backend2", "UTM2", now, now, "descrip");
        Experience experience3 = new Experience("Java Backend3", "UTM3", now, now, "descrip");

        experienceRepository.save(experience);
        experienceRepository.save(experience2);
        experienceRepository.save(experience3);
    }

    @Test
    void shouldReturnAllExperiences() {
        ResponseEntity<List<Experience>> response = restTemplate
                .exchange(
                        "/api/exp/"
                        , HttpMethod.GET
                        , null
                        , new ParameterizedTypeReference<List<Experience>>() {}
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).hasSize(3);
    }

    @Test
    void shouldReturnExperienceById() {
        ResponseEntity<Experience> response = restTemplate
                .getForEntity(
                        "/api/exp/1"
                        , Experience.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getId()).isEqualTo(1L);
    }

    @Test
    void shouldReturnNotFoundByUnknowId() {
        ResponseEntity<Experience> response = restTemplate
                .getForEntity(
                        "/api/exp/122222222222222222"
                        , Experience.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void shouldCreateNewExperience() {
        Experience exp = new Experience("puk", "UTM", LocalDate.now(), LocalDate.now(), "descrip");

        HttpEntity<Experience> request = new HttpEntity<>(exp);

        ResponseEntity<Experience> response = restTemplate
                .withBasicAuth("vova", "123")
                .exchange(
                        "/api/exp/"
                        , HttpMethod.POST
                        , request
                        , Experience.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    void shouldUpdateExperience() {
        Experience exp = new Experience("puk", "UTM", LocalDate.now(), LocalDate.now(), "descrip");

        Experience savedExp = experienceRepository.save(exp);

        Long id = savedExp.getId();

        Experience expToUpdate = new Experience("puk2", "UTM", LocalDate.now(), LocalDate.now(), "descrip");
        HttpEntity<Experience> request = new HttpEntity<>(expToUpdate);

        ResponseEntity<Experience> response = restTemplate
                .withBasicAuth("vova", "123")
                .exchange(
                        "/api/exp/" + id
                        , HttpMethod.PUT
                        , request
                        , Experience.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getId()).isEqualTo(savedExp.getId());
        assertThat(response.getBody().getPosition()).isEqualTo("puk2");
    }

    @Test
    void shouldDeleteExperience() {
        Experience exp = new Experience("puk", "UTM", LocalDate.now(), LocalDate.now(), "descrip");

        Experience savedExp = experienceRepository.save(exp);
        Long id = savedExp.getId();

        ResponseEntity<Void> response = restTemplate
                .withBasicAuth("vova", "123")
                .exchange(
                        "/api/exp/" + id
                        , HttpMethod.DELETE
                        , null
                        , Void.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);

        ResponseEntity<Experience> response1 = restTemplate
                .getForEntity(
                        "/api/exp/" + id
                        , Experience.class);

        assertThat(response1.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

}
