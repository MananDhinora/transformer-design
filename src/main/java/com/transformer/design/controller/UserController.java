package com.transformer.design.controller;

import com.transformer.design.DTO.UserDTO;
import com.transformer.design.model.UserData;
import com.transformer.design.service.AuthService;
import com.transformer.design.service.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthService authService;

    /*
     * POST "/auth/signup"
     *
     * Used for signup.
     *
     * Creates a new user and encrypts the password before storing in MongoDB
     *
     * returns a UserData of the newly created user, return type : ResponseEntity<?>
     */
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createUser(@RequestBody UserDTO registeredUserDTO) {

        try {
            UserData registeredUser = authService.signup(registeredUserDTO);
            return ResponseEntity.ok(registeredUser);
        }
        catch (Exception e) {
            log.atError().log("User {} not created, error:", registeredUserDTO.getEmail(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
     * GET "/auth/login"
     *
     * Used for login authenticates user, if user is authenticated jwt is created and
     * assigned
     *
     * returns jwt and its expiration time, return type : ResponseEntity<?>
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO loginUserDTO) {
        try {
            UserData authenticatedUser = authService.authenticate(loginUserDTO);
            String jwtToken = jwtService.generateToken(authenticatedUser);
            return new ResponseEntity<>(
                    "JwtToken: " + jwtToken + "\nToken will expire in:" + jwtService.getExpirationTime(),
                    HttpStatus.OK);
        }
        catch (Exception e) {
            log.atError().log("User {} was not authenticated, error:", loginUserDTO.getEmail(), e);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

}