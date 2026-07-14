package volodea.cv.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String displayName;
    private String imageUrl;
    private String country;
    private String email;
    private String telegram;
    private String urlLeet;
    private String urlGit;

    public User(){};

    public User(String name, String displayName) {
        this.displayName = displayName;
        this.name = name;
    }

    public String getDisplayName() {
        return displayName;
    }

    public User(String name, String displayName, String country
            , String imageUrl, String email, String telegram, String urlLeet, String urlGit) {
        this.name = name;
        this.displayName = displayName;
        this.country = country;
        this.imageUrl = imageUrl;
        this.email = email;
        this.telegram = telegram;
        this.urlLeet = urlLeet;
        this.urlGit = urlGit;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getCountry() {
        return country;
    }

    public String getEmail() {
        return email;
    }

    public String getTelegram() {
        return telegram;
    }

    public String getUrlLeet() {
        return urlLeet;
    }

    public String getUrlGit() {
        return urlGit;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String name) {
        this.name = name;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setTelegram(String telegram) {
        this.telegram = telegram;
    }

    public void setUrlLeet(String urlLeet) {
        this.urlLeet = urlLeet;
    }

    public void setUrlGit(String urlGit) {
        this.urlGit = urlGit;
    }
}
