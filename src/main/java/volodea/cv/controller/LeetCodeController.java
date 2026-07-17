package volodea.cv.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import volodea.cv.dto.LeetCodeDay;
import volodea.cv.dto.LeetCodeStatsDto;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leetcode-stats")
public class LeetCodeController {

    @Value("${leetcode.username}")
    private String username;

    private final RestTemplate restTemplate = new RestTemplate();

    @Cacheable("leetcodeStats")
    @GetMapping
    public ResponseEntity<LeetCodeStatsDto> getStats() {
        String query = """
            {
              matchedUser(username: "%s") {
                submitStatsGlobal {
                  acSubmissionNum { difficulty count }
                }
                userCalendar {
                  streak
                  submissionCalendar
                }
              }
            }
            """.formatted(username);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Referer", "https://leetcode.com");

        Map<String, String> body = Map.of("query", query);
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                "https://leetcode.com/graphql", entity, Map.class);

        Map responseBody = response.getBody();
        Map data = (Map) responseBody.get("data");
        Map matchedUser = (Map) data.get("matchedUser");
        Map submitStatsGlobal = (Map) matchedUser.get("submitStatsGlobal");
        List<Map> acSubmissionNum = (List<Map>) submitStatsGlobal.get("acSubmissionNum");

        int easy = 0, medium = 0, hard = 0, all = 0;
        for (Map entry : acSubmissionNum) {
            String difficulty = (String) entry.get("difficulty");
            int count = (int) entry.get("count");
            switch (difficulty) {
                case "Easy" -> easy = count;
                case "Medium" -> medium = count;
                case "Hard" -> hard = count;
                case "All" -> all = count;
            }
        }

        Map userCalendar = (Map) matchedUser.get("userCalendar");
        int streak = (int) userCalendar.get("streak");
        String submissionCalendarJson = (String) userCalendar.get("submissionCalendar");

        List<LeetCodeDay> days = parseSubmissionCalendar(submissionCalendarJson);

        return ResponseEntity.ok(new LeetCodeStatsDto(all, easy, medium, hard, streak, days));
    }

    private List<LeetCodeDay> parseSubmissionCalendar(String json) {
        List<LeetCodeDay> days = new ArrayList<>();
        if (json == null || json.isBlank()) return days;

        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Integer> raw = mapper.readValue(json, new TypeReference<Map<String, Integer>>() {});

            LocalDate cutoff = LocalDate.now().minusDays(30);

            for (Map.Entry<String, Integer> entry : raw.entrySet()) {
                long timestamp = Long.parseLong(entry.getKey());
                LocalDate date = Instant.ofEpochSecond(timestamp)
                        .atZone(ZoneOffset.UTC)
                        .toLocalDate();

                if (!date.isBefore(cutoff)) {
                    days.add(new LeetCodeDay(date.toString(), entry.getValue()));
                }
            }

            days.sort(Comparator.comparing(LeetCodeDay::date));
        } catch (Exception e) {
            // если формат ответа LeetCode изменится — просто вернём пустой список
        }

        return days;
    }
}
