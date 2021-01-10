package com.hamster.website;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Homepage {
    @RequestMapping("/api")
    public String getHello() {
        return "Hello World";
    }

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
}
