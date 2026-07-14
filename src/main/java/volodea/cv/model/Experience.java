package volodea.cv.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String position;
    private String company;

    private LocalDate startDate;
    private LocalDate endDate;

    @ElementCollection
    private List<String> skills;
}
