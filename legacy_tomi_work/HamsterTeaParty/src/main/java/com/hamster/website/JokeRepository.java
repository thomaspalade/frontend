package com.hamster.website;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface JokeRepository extends MongoRepository<Joke, String> {
    public List<Joke> findByTitle(String title);
    public List<Joke> findBy_id(String _id);
    public List<Joke> findByposterId(String posterId);
    public List<Joke> findByTagsIn(List<String> tags);
}
