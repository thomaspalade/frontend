package com.hamster.website;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FinancialController {
    private JokeRepository jokeRepository;
    private JwtTokenUtil jwtTokenUtil;
    private UserRepository userRepository;
    private FinancialHandler financialHandler;

    @Autowired
    public FinancialController(JokeRepository jokeRepository, JwtTokenUtil jwtTokenUtil, UserRepository userRepository, FinancialHandler financialHandler) {
        this.jokeRepository = jokeRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepository = userRepository;
        this.financialHandler = financialHandler;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/donate")
    public ResponseEntity<?> donate(RequestEntity<Transaction> requestEntity){
        return ResponseEntity.ok(
                financialHandler.ProcessTransaction(requestEntity.getBody())
        );
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/tryPremium")
    public ResponseEntity<?> tryPremium(RequestEntity<Transaction> requestEntity){
        String token = requestEntity.getHeaders().getFirst("Authorization");
        if (token == null)
            return ResponseEntity.status(403).body("No auth token");
        User user = userRepository.findByUserName(jwtTokenUtil.getUsernameFromToken(token)).get(0);
        financialHandler.ProcessTransaction(requestEntity.getBody());
        if(requestEntity.getBody().getAmount() == 10)
            user.setAccountType("Premium");
        else if (requestEntity.getBody().getAmount() == 15)
            user.setAccountType(("Gold"));
        else
            user.setAccountType("Premium");
        System.out.println(requestEntity.getBody().getAmount());
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/getCoins")
    public ResponseEntity<?> getCoins(RequestEntity<Transaction> requestEntity){
        String token = requestEntity.getHeaders().getFirst("Authorization");
        if (token == null)
            return ResponseEntity.status(403).body("No auth token");
        User user = userRepository.findByUserName(jwtTokenUtil.getUsernameFromToken(token)).get(0);
        financialHandler.ProcessTransaction(requestEntity.getBody());
        user.setCoins(user.getCoins() + requestEntity.getBody().getAmount());
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
}
