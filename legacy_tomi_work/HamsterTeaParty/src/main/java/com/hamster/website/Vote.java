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
public class Vote {
    private JokeRepository jokeRepository;
    private JwtTokenUtil jwtTokenUtil;
    private UserRepository userRepository;
    @Autowired
    public Vote(JokeRepository jokeRepository, JwtTokenUtil jwtTokenUtil, UserRepository userRepository) {
        this.jokeRepository = jokeRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepository = userRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/upvote")  /// AICI MAI JOS MAI TREBUIE LUCRAT PUTIN
    public ResponseEntity<?> upvote(RequestEntity<Joke> requestEntity) {
        System.out.println("upvoting");
        String token = requestEntity.getHeaders().getFirst("Authorization");
        if (token == null)
            return ResponseEntity.status(403).body("No auth token");
        User user = userRepository.findByUserName(jwtTokenUtil.getUsernameFromToken(token)).get(0);
        Joke joke = requestEntity.getBody();
        System.out.println("initial joke" + joke);
        assert joke != null;
        //TODO persista data
        System.out.println(joke.getUpvotersIDs());
        if(joke.getUpvotersIDs() == null)
            joke.setUpvotersIDs(new ArrayList<>());
        System.out.println("upvoter id's" + joke.getUpvotersIDs());
        if (joke.getUpvotersIDs().contains(user.get_id())) {
            System.out.println("user trying to upvote twice");
            return ResponseEntity.ok().build();
        }
        if(!joke.getUpvotersIDs().contains(user.get_id())) {
            joke.getUpvotersIDs().add(user.get_id());
            jokeRepository.save(joke);
            user.setUpvotedCounter(user.getUpvotedCounter() + 1);
            userRepository.save(user);
        }
        return ResponseEntity.ok().build();
    }
}
