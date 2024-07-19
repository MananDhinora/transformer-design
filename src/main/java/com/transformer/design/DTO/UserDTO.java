package com.transformer.design.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private String id;
    private String email;
    private String password;
}
