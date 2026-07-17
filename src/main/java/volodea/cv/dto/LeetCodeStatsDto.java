package volodea.cv.dto;

import java.util.List;

public record LeetCodeStatsDto(int totalSolved, int easy, int medium, int hard, int streak, List<LeetCodeDay> days) {
}
