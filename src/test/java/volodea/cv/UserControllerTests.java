package volodea.cv;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import volodea.cv.model.User;
import volodea.cv.repository.UserRepository;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTests {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void shouldReturnAUser() {
        ResponseEntity<User> response = restTemplate.getForEntity("/api/user/", User.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    void shouldReturnNotFoundWhenUpdatingUserWithoutAdminRole() {
        User testUser = new User("vova", "Volodea");

        HttpEntity<User> request = new HttpEntity<>(testUser);

        ResponseEntity<User> response = restTemplate
                .withBasicAuth("guest", "guestpass")
                .exchange(
            "/api/user/"
                , HttpMethod.PUT
                , request
                , User.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void shouldUpdateUserWithAdminRole() {
        User testUser = new User("vova", "Vladimir!!88");

        HttpEntity<User> request = new HttpEntity<>(testUser);

        ResponseEntity<User> response = restTemplate
                .withBasicAuth("vova", "123")
                .exchange(
                        "/api/user/"
                        , HttpMethod.PUT
                        , request
                        , User.class
                );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        assertThat(response.getBody().getDisplayName()).isEqualTo("Vladimir!!88");
    }
}
