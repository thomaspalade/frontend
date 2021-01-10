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
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@RestController
public class JokeController {
    // static Integer lastId = 0;
    private JokeRepository jokeRepository;
    private JwtTokenUtil jwtTokenUtil;
    private UserRepository userRepository;
    @Autowired
    public JokeController(JokeRepository jokeRepository, JwtTokenUtil jwtTokenUtil, UserRepository userRepository) {
        this.jokeRepository = jokeRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepository = userRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
        @GetMapping(path = "/jokes")
    public List<Joke> getAllJokes(
    ){

        return jokeRepository.findAll();
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/postJoke")
    public ResponseEntity<?> postJoke(RequestEntity<Joke> requestEntity) {
        String token = requestEntity.getHeaders().getFirst("Authorization");
        if (token == null)
            return ResponseEntity.status(403).body("No auth token");
        String userId = userRepository.findByUserName(jwtTokenUtil.getUsernameFromToken(token)).get(0)._id;
        Joke newJoke = requestEntity.getBody();
        newJoke.setPosterId(userId);
        newJoke.setAwardersIDs(new ArrayList<>());
        newJoke.setUpvotersIDs(new ArrayList<>());
        newJoke.setCreatedAt(new Date(System.currentTimeMillis()));
        jokeRepository.save(newJoke);
        return ResponseEntity.ok().body("OK");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/joke")
    public ResponseEntity<Joke> getJoke(
            @RequestParam String _id
    ){
        System.out.println(ResponseEntity.ok(jokeRepository.findBy_id(_id).stream().findFirst().get()));
        return ResponseEntity.ok(jokeRepository.findBy_id(_id).stream().findFirst().get());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/jokesByPoster")
    public ResponseEntity<?> getJokesByPoster(
            @RequestParam String posterId
    ){
        System.out.println(ResponseEntity.ok(jokeRepository.findByposterId(posterId)));
        return ResponseEntity.ok(jokeRepository.findByposterId(posterId));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/jokesByDate")
    public ResponseEntity<?> getSortedJokesByDate(){
        System.out.println(ResponseEntity.ok(jokeRepository.findAll(Sort.by("createdAt"))));
        List <Joke> sortedJokes = jokeRepository.findAll(Sort.by("createdAt"));
        Collections.reverse(sortedJokes);
        return ResponseEntity.ok(sortedJokes);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/jokesByUpvotes")
    public ResponseEntity<?> getSortedJokesByUpvotes(){
        List<Joke> jokes = jokeRepository.findAll();
        System.out.println("BEFORE SORT");
        System.out.println(jokes);
        jokes.sort(Comparator.comparingInt(joke -> joke.upvotersIDs.size()));
        System.out.println("AFTER SORT SORT");
        System.out.println(jokes);
        return ResponseEntity.ok(jokes);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/trending")
    public ResponseEntity<?> getTrending(){

        System.out.println(jokeRepository.findAll().stream().filter(joke ->
                TimeUnit.DAYS.convert(
                        new Date(System.currentTimeMillis()).getTime() - joke.getCreatedAt().getTime(),TimeUnit.MILLISECONDS ) >= 0)
                .collect(Collectors.toList()));

        return ResponseEntity.ok( jokeRepository.findAll().stream().filter(joke ->
                TimeUnit.DAYS.convert(
                        new Date(System.currentTimeMillis()).getTime() - joke.getCreatedAt().getTime(),TimeUnit.MILLISECONDS ) >= 0)
                .collect(Collectors.toList()));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/search")
    public ResponseEntity<?> searchByTags(
            @RequestParam String tags){
        if(tags.equals(""))
            return ResponseEntity.ok(jokeRepository.findAll());
        System.out.println("searchin for a new joke tati");
        System.out.println(tags);
        System.out.println(Arrays.asList(tags.split(" ")));
        // System.out.println(requestEntity);

        System.out.println("Repository-ul de glume: " + jokeRepository.findAll());
        System.out.println("Urmeaza vectorul cautat: " + jokeRepository.findByTagsIn(
                Arrays.asList(
                        tags.split(" ")
                )
        ));
//        System.out.println(requestEntity.getBody());

        return ResponseEntity.ok(
                jokeRepository.findByTagsIn(
                        Arrays.asList(
                                tags.split(" ")
                        )
                )
        );
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/deleteJoke")
    public ResponseEntity<?> deleteJoke(RequestEntity<Map<String,String>> requestEntity) {
        String token = requestEntity.getHeaders().getFirst("Authorization");
        System.out.println(token);
        if (token == null)
            return ResponseEntity.status(403).body("No auth token");
        String userId = userRepository.findByUserName(jwtTokenUtil.getUsernameFromToken(token)).get(0)._id;
        System.out.println(requestEntity.getBody());
        jokeRepository.findBy_id(requestEntity.getBody().get("jokeId")).stream().findFirst().ifPresent(joke -> {
                    System.out.println("before delete" + jokeRepository.findAll());
                    /*
                    if(joke.getPosterId() != userId) {
                        System.out.println("User " + userId + "tried to delete joke " + joke.get_id() + "which isnt his");
                        return;
                    }
                     */
                    jokeRepository.delete(joke);
                    System.out.println("before delete" + jokeRepository.findAll());

                }
                );
        return ResponseEntity.ok().build();
    }

//    @CrossOrigin(origins = "http://localhost:3000")
//    @PutMapping(path = "/upvoteJoke")
//    public ResponseEntity<?> upvote(RequestEntity<Joke> requestEntity){
//        String token = requestEntity.getHeaders().getFirst("Authorization");
//        if (token == null)
//            return ResponseEntity.status(403).body("No auth token");
//        String userId = userRepository.findByUserName(jwtTokenUtil.getUsernameFromToken(token)).get(0)._id;
//        requestEntity.getBody().getUpvotersIDs().add(userId);
//        jokeRepository.save(requestEntity.getBody());
//        return ResponseEntity.ok().build();
//    }
//
//    @CrossOrigin(origins = "http://localhost:3000")
//    @PutMapping(path = "/awardJoke")
//    public ResponseEntity<?> award(RequestEntity<Joke> requestEntity){
//        String token = requestEntity.getHeaders().getFirst("Authorization");
//        if (token == null)
//            return ResponseEntity.status(403).body("No auth token");
//        String userId = userRepository.findByUserName(jwtTokenUtil.getUsernameFromToken(token)).get(0)._id;
//        requestEntity.getBody().getAwardersIDs().add(userId);
//        jokeRepository.save(requestEntity.getBody());
//        return ResponseEntity.ok().build();
//    }
}
