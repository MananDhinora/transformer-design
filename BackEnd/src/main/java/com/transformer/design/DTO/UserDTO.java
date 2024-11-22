package com.transformer.design.DTO;

import lombok.Builder;
import lombok.Data;

/*
* DTO for the userData
*
* Used for both signup and login
*/
@Data
@Builder
public class UserDTO {

    private String id;

    private String email;

    private String password;

    private String username;
}
