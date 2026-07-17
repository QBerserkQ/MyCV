package volodea.cv.dto;

import java.util.List;

public record GithubStatsDto(int totalContributions, int repositoryCount, List<GithubDay> days) {
}
