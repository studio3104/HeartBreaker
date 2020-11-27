package com.studio3104.heartbreaker.jsonmodel;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class HelloWorld extends AnyJson {
    public HelloWorld() {
        super();
        this.setAdditionalProperty("Hello", "World");
    }

    public String toJson() {
        try {
            return new ObjectMapper().writeValueAsString(this);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }
}
