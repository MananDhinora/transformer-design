package com.transformer.design.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Document(value = "user")
@Data
@Builder
public class UserData {
    @Id
    private String id;
    private String email;
    private String password;
}
