package volodea.cv.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String theme;
    private String title;
    private String description;
    private String gitUrl;

    @ElementCollection
    @CollectionTable(
            name = "project_skills",
            joinColumns = @JoinColumn(name = "project_id")
    )
    @Column(name = "skill")
    private List<String> skills;

    private String imageUrl;

    public Project() {}

    public Project(String theme, String title, String description, String gitUrl, List<String> skills, String imageUrl) {
        this.theme = theme;
        this.title = title;
        this.description = description;
        this.gitUrl = gitUrl;
        this.skills = skills;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGitUrl() {
        return gitUrl;
    }

    public void setGitUrl(String gitUrl) {
        this.gitUrl = gitUrl;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
