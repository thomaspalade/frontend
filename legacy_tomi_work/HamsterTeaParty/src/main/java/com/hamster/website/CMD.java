package com.hamster.website;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;

@Component
public class CMD implements CommandLineRunner {

    private UserRepository userRepository;
    private JokeRepository jokeRepository;

    @Autowired
    public CMD(UserRepository userRepository, JokeRepository jokeRepository) {
        this.userRepository = userRepository;
        this.jokeRepository = jokeRepository;
    }

    @Override
    public void run(String...args) throws Exception {
        // userRepository.deleteAll();
        // jokeRepository.deleteAll();
        User vlad = new User("0","cptvladski","1234","cptvladski@gmail.com","vlad","leica",21,"RO","clung","fb.com/vlad","vlad");
        vlad.setAccountType("Premium");
        vlad.setIsPrivileged(1);
        userRepository.save(vlad);
        userRepository.save(new User("25","cptvladsky","1235","cptvladski@gmail.com","vlad","leica",21,"RO","clung","fb.com/vlad","vlad"));
        System.out.println(userRepository.findAll());

//        jokeRepository.save(new Joke("1", "adasdes", "newjoke1", "Acesta este textul", new Date(System.currentTimeMillis()),new ArrayList<>(),new ArrayList<>(),new ArrayList<>()));
        System.out.println(jokeRepository.findAll());
    }
}