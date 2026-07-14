package volodea.cv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import volodea.cv.model.User;
import volodea.cv.repository.UserRepository;

import java.security.Principal;

@RestController
@RequestMapping("/api/user/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<User> getUser(){
        return userRepository.findAll()
                .stream()
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user, Principal principal) {
        User userToUpdate = userRepository.findByName(principal.getName()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        userToUpdate.setDisplayName(user.getDisplayName());
        userToUpdate.setCountry(user.getCountry());
        userToUpdate.setImageUrl(user.getImageUrl());
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setTelegram(user.getTelegram());
        userToUpdate.setUrlLeet(user.getUrlLeet());
        userToUpdate.setUrlGit(user.getUrlGit());

        userRepository.save(userToUpdate);

        return ResponseEntity.ok(userToUpdate);
    }
}
