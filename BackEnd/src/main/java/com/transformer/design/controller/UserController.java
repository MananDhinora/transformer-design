package com.transformer.design.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.transformer.design.DTO.UserDTO;
import com.transformer.design.model.UserData;
import com.transformer.design.service.AuthService;
import com.transformer.design.service.JwtService;

import lombok.extern.slf4j.Slf4j;

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
        } catch (Exception e) {
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
            Map<String, Object> response = new HashMap<>();
            response.put("token", jwtToken);
            response.put("expirationTime", jwtService.getExpirationTime());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("User {} was not authenticated, error:", loginUserDTO.getEmail(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
