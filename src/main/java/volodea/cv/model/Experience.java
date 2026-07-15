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

    private String description;

    public Experience() {}

    public Experience(String position, String company, LocalDate startDate, LocalDate endDate, String description) {
        this.position = position;
        this.company = company;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getPosition() {
        return position;
    }

    public String getCompany() {
        return company;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
