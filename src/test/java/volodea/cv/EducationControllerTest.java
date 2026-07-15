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
import volodea.cv.model.Education;
import volodea.cv.repository.EducationRepository;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.annotation.DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@DirtiesContext(classMode = AFTER_EACH_TEST_METHOD)
class EducationControllerTest {

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private TestRestTemplate restTemplate;

    @BeforeEach
    void setup() {
        LocalDate date = LocalDate.of(2025, 6, 1);

        educationRepository.save(
                new Education(
                        "Computer Science",
                        "UTM",
                        date,
                        "Bachelor degree"
                )
        );

        educationRepository.save(
                new Education(
                        "Software Engineering",
                        "MIT",
                        date,
                        "Master degree"
                )
        );

        educationRepository.save(
                new Education(
                        "Cyber Security",
                        "Oxford",
                        date,
                        "Courses"
                )
        );
    }

    @Test
    void shouldReturnAllEducations() {
        ResponseEntity<List<Education>> response = restTemplate
                .exchange(
                "/api/education/",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Education>>() {}
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).hasSize(3);
    }

    @Test
    void shouldReturnEducationById() {
        ResponseEntity<Education> response =
                restTemplate.getForEntity(
                        "/api/education/1",
                        Education.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getId()).isEqualTo(1L);
    }

    @Test
    void shouldReturnNotFoundForUnknownId() {
        ResponseEntity<Education> response =
                restTemplate.getForEntity(
                        "/api/education/999999",
                        Education.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void shouldCreateEducation() {
        Education education = new Education(
                "Artificial Intelligence",
                "Stanford",
                LocalDate.of(2026, 7, 1),
                "AI specialization"
        );

        HttpEntity<Education> request = new HttpEntity<>(education);

        ResponseEntity<Education> response = restTemplate
                .withBasicAuth("vova", "123")
                .exchange(
                        "/api/education/",
                        HttpMethod.POST,
                        request,
                        Education.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().getSpeciality())
                .isEqualTo("Artificial Intelligence");
    }

    @Test
    void shouldUpdateEducation() {

        Education education = educationRepository.save(
                new Education(
                        "Computer Science",
                        "UTM",
                        LocalDate.of(2025, 1, 1),
                        "Bachelor"
                )
        );

        Long id = education.getId();

        Education updated = new Education(
                "Software Engineering",
                "UTM",
                LocalDate.of(2026, 1, 1),
                "Updated description"
        );

        HttpEntity<Education> request = new HttpEntity<>(updated);

        ResponseEntity<Education> response = restTemplate
                .withBasicAuth("vova", "123")
                .exchange(
                        "/api/education/" + id,
                        HttpMethod.PUT,
                        request,
                        Education.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getId()).isEqualTo(id);
        assertThat(response.getBody().getSpeciality())
                .isEqualTo("Software Engineering");
    }

    @Test
    void shouldDeleteEducation() {

        Education education = educationRepository.save(
                new Education(
                        "Computer Science",
                        "UTM",
                        LocalDate.now(),
                        "Bachelor"
                )
        );

        Long id = education.getId();

        ResponseEntity<Void> response = restTemplate
                .withBasicAuth("vova", "123")
                .exchange(
                        "/api/education/" + id,
                        HttpMethod.DELETE,
                        null,
                        Void.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);

        ResponseEntity<Education> responseAfterDelete =
                restTemplate.getForEntity(
                        "/api/education/" + id,
                        Education.class
                );

        assertThat(responseAfterDelete.getStatusCode())
                .isEqualTo(HttpStatus.NOT_FOUND);
    }
}