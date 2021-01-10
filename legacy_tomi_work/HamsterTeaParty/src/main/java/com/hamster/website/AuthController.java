package com.hamster.website;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class AuthController {
    static Integer lastId = 0;
    private UserRepository userRepository;
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    public AuthController(UserRepository userRepository, JwtTokenUtil jwtTokenUtil) {
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/signup")
    public ResponseEntity<?> signUpEndpoint(
        @RequestBody User user
    ){
        //TODO duplicate username
        System.out.println(user);
        boolean dup = !userRepository.findByUserName(user.userName).stream().findFirst().isEmpty();
        if(dup)
            return ResponseEntity.status(400).body("Duplicate Username");
        user.setAccountType("Regular");
        userRepository.save(user);
        System.out.println("Tot repository-ul de useri arata acum asa:");
        System.out.println(userRepository.findAll());
        return ResponseEntity.ok(true);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/updateUser")
    public ResponseEntity<?> updateUser(
            @RequestBody User user
    ){
        System.out.println("HERE BABY");
        System.out.println(user);
//        boolean dup = !userRepository.findByUserName(user.userName).stream().findFirst().isEmpty();
//        if(dup)
//            return ResponseEntity.status(400).body("Duplicate Username");
        userRepository.save(user);
        System.out.println("Tot repository-ul de useri arata acum asa:");
        System.out.println(userRepository.findAll());
        return ResponseEntity.ok(true);
    }

    @PostMapping(path = "/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> loginEndpoint(
            @RequestBody JwtRequest authenticationRequest
    ) throws ChangeSetPersister.NotFoundException {
        List<User> users = userRepository.findByUserName(authenticationRequest.getUserName());
        User user = users.stream().findFirst().orElseThrow(ChangeSetPersister.NotFoundException::new);
        if(!user.getPasswd().equals(authenticationRequest.getPasswd()))
            return  ResponseEntity.badRequest().body("Invalid credentials");

        final String token = jwtTokenUtil.generateToken(user);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/user")
    public ResponseEntity<User> getUser(
            @RequestParam String _id
    ){
        System.out.println(ResponseEntity.ok(userRepository.findBy_id(_id).stream().findFirst().get()));
        return ResponseEntity.ok(userRepository.findBy_id(_id).stream().findFirst().get());
    }
    /*
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/user")
    public ResponseEntity<String> getUserIdByToken(
            @RequestParam String token
    ){
        String userId = userRepository.findByUserName(jwtTokenUtil.getUsernameFromToken(token)).get(0)._id;
        System.out.println(userId);
        return ResponseEntity.ok(userId);
    }
     */

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/userById")
    public ResponseEntity<?> getUserId(RequestEntity<Void> requestEntity) {
        String token = requestEntity.getHeaders().getFirst("Authorization");
        if (token == null)
            return ResponseEntity.status(403).body("No auth token");
        String userId = userRepository.findByUserName(jwtTokenUtil.getUsernameFromToken(token)).get(0)._id;
        return ResponseEntity.ok(userId);   // asa?
    }

}