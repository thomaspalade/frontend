package com.hamster.website;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.*;

@RestController
public class Award {
    // static Integer lastId = 0;
    private JokeRepository jokeRepository;
    private JwtTokenUtil jwtTokenUtil;
    private UserRepository userRepository;
    @Autowired
    public Award(JokeRepository jokeRepository, JwtTokenUtil jwtTokenUtil, UserRepository userRepository) {
        this.jokeRepository = jokeRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepository = userRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/award")  /// AICI MAI JOS MAI TREBUIE LUCRAT PUTIN
    public ResponseEntity<?> upvote(RequestEntity<Joke> requestEntity) {
        String token = requestEntity.getHeaders().getFirst("Authorization");
        if (token == null)
            return ResponseEntity.status(403).body("No auth token");
        User user = userRepository.findByUserName(jwtTokenUtil.getUsernameFromToken(token)).get(0);
        Joke joke = requestEntity.getBody();
        assert joke != null;
        if(joke.getAwardersIDs() == null)
            joke.setAwardersIDs(new ArrayList<>());
        System.out.println(joke.getAwardersIDs());
        if(!joke.getAwardersIDs().contains(user.get_id())) {
            joke.getAwardersIDs().add(user.get_id());
            jokeRepository.save(joke);
            user.setAwardedCounter(user.getAwardedCounter() + 1);
            userRepository.save(user);
        }

        return ResponseEntity.ok().build();
    }
}
