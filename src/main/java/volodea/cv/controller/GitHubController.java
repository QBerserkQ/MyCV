package volodea.cv.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import volodea.cv.dto.GithubDay;
import volodea.cv.dto.GithubStatsDto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/github-stats")
public class GitHubController {

    @Value("${github.token}")
    private String token;

    @Value("${github.username}")
    private String username;

    private final RestTemplate restTemplate = new RestTemplate();

    @Cacheable("githubStats")
    @GetMapping
    public ResponseEntity<GithubStatsDto> getStats() {
        LocalDate to = LocalDate.now();
        LocalDate from = to.minusDays(30);

        String query = """
            {
              user(login: "%s") {
                contributionsCollection(from: "%sT00:00:00Z", to: "%sT23:59:59Z") {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        date
                        contributionCount
                      }
                    }
                  }
                }
                repositories { totalCount }
              }
            }
            """.formatted(username, from, to);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = Map.of("query", query);
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                "https://api.github.com/graphql", entity, Map.class);

        Map responseBody = response.getBody();
        Map data = (Map) responseBody.get("data");
        Map user = (Map) data.get("user");
        Map contributionsCollection = (Map) user.get("contributionsCollection");
        Map contributionCalendar = (Map) contributionsCollection.get("contributionCalendar");

        int totalContributions = (int) contributionCalendar.get("totalContributions");
        List<Map> weeks = (List<Map>) contributionCalendar.get("weeks");

        List<GithubDay> days = new ArrayList<>();
        for (Map week : weeks) {
            List<Map> contributionDays = (List<Map>) week.get("contributionDays");
            for (Map day : contributionDays) {
                days.add(new GithubDay((String) day.get("date"), (int) day.get("contributionCount")));
            }
        }

        Map repositories = (Map) user.get("repositories");
        int repoCount = (int) repositories.get("totalCount");

        return ResponseEntity.ok(new GithubStatsDto(totalContributions, repoCount, days));
    }
}
