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
import volodea.cv.model.Project;
import volodea.cv.repository.ProjectRepository;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.annotation.DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@DirtiesContext(classMode = AFTER_EACH_TEST_METHOD)
class ProjectControllerTest {


    @Autowired
    private ProjectRepository projectRepository;


    @Autowired
    private TestRestTemplate restTemplate;



    @BeforeEach
    void setup() {

        projectRepository.save(
                new Project(
                        "Backend",
                        "Places API",
                        "REST API for places",
                        "https://github.com/places",
                        List.of("Java", "Spring Boot", "PostgreSQL"),
                        "places.png"
                )
        );


        projectRepository.save(
                new Project(
                        "Frontend",
                        "Portfolio",
                        "Personal CV website",
                        "https://github.com/cv",
                        List.of("React", "Tailwind"),
                        "cv.png"
                )
        );


        projectRepository.save(
                new Project(
                        "Full Stack",
                        "Schedule Parser",
                        "University schedule parser",
                        "https://github.com/parser",
                        List.of("Java", "Jsoup"),
                        "schedule.png"
                )
        );
    }




    @Test
    void shouldReturnAllProjects() {

        ResponseEntity<List<Project>> response =
                restTemplate.exchange(
                        "/api/project/",
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<List<Project>>() {}
                );


        assertThat(response.getStatusCode())
                .isEqualTo(HttpStatus.OK);


        assertThat(response.getBody())
                .hasSize(3);


        assertThat(response.getBody().get(0).getTitle())
                .isEqualTo("Places API");
    }





    @Test
    void shouldReturnProjectById() {


        ResponseEntity<Project> response =
                restTemplate.getForEntity(
                        "/api/project/1",
                        Project.class
                );


        assertThat(response.getStatusCode())
                .isEqualTo(HttpStatus.OK);


        assertThat(response.getBody().getId())
                .isEqualTo(1L);


        assertThat(response.getBody().getSkills())
                .contains("Java");
    }






    @Test
    void shouldReturnNotFoundForUnknownId() {
        ResponseEntity<Project> response =
                restTemplate.getForEntity(
                        "/api/project/999999",
                        Project.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }





    @Test
    void shouldCreateProject() {
        Project project = new Project(
                "Backend",
                "Authentication Service",
                "Spring Security project",
                "https://github.com/security",
                List.of("Spring Security", "JWT"),
                "security.png"
        );

        HttpEntity<Project> request =
                new HttpEntity<>(project);

        ResponseEntity<Project> response =
                restTemplate
                        .withBasicAuth("vova", "123")
                        .exchange(
                                "/api/project/",
                                HttpMethod.POST,
                                request,
                                Project.class
                        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().getTitle()).isEqualTo("Authentication Service");
        assertThat(response.getBody().getSkills()).contains("JWT");
    }






    @Test
    void shouldUpdateProject() {


        Project project = projectRepository.save(
                new Project(
                        "Backend",
                        "Old project",
                        "Old description",
                        "old.git",
                        List.of("Java"),
                        "old.png"
                )
        );


        Long id = project.getId();



        Project updated = new Project(
                "Backend",
                "New project",
                "Updated description",
                "new.git",
                List.of("Spring Boot", "Docker"),
                "new.png"
        );



        HttpEntity<Project> request =
                new HttpEntity<>(updated);



        ResponseEntity<Project> response =
                restTemplate
                        .withBasicAuth("vova", "123")
                        .exchange(
                                "/api/project/" + id,
                                HttpMethod.PUT,
                                request,
                                Project.class
                        );



        assertThat(response.getStatusCode())
                .isEqualTo(HttpStatus.OK);



        assertThat(response.getBody().getId())
                .isEqualTo(id);



        assertThat(response.getBody().getTitle())
                .isEqualTo("New project");


        assertThat(response.getBody().getSkills())
                .contains("Docker");
    }







    @Test
    void shouldDeleteProject() {


        Project project = projectRepository.save(
                new Project(
                        "Backend",
                        "Delete project",
                        "Test delete",
                        "delete.git",
                        List.of("Java"),
                        "delete.png"
                )
        );


        Long id = project.getId();



        ResponseEntity<Void> response =
                restTemplate
                        .withBasicAuth("vova", "123")
                        .exchange(
                                "/api/project/" + id,
                                HttpMethod.DELETE,
                                null,
                                Void.class
                        );



        assertThat(response.getStatusCode())
                .isEqualTo(HttpStatus.NO_CONTENT);



        ResponseEntity<Project> responseAfterDelete =
                restTemplate.getForEntity(
                        "/api/project/" + id,
                        Project.class
                );



        assertThat(responseAfterDelete.getStatusCode())
                .isEqualTo(HttpStatus.NOT_FOUND);
    }
}