package com.transformer.design.service;

import com.transformer.design.DTO.UserDTO;
import com.transformer.design.model.UserData;
import com.transformer.design.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	/*
	 * New method to hash the password string using MD5. It converts the input password
	 * into bytes then hashes the bytes using MD5 algorithm, next we convert the hashed
	 * array of bytes back to hexadecimal
	 */
	public String hashPassword(String userPassword) {
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			byte[] digest = md5.digest(userPassword.getBytes());
			StringBuilder stringBuffer = new StringBuilder();
			for (byte b : digest) {
				stringBuffer.append(String.format("%02x", b));
			}
			return stringBuffer.toString();
		}
		catch (NoSuchAlgorithmException e) {
			new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
			return null;
		}
	}

	/*
	 * New method to create users in the database.
	 */
	public ResponseEntity<?> createUser(UserDTO userDTO) {
		try {
			if (userRepository.findByEmail(userDTO.getEmail()) == null) {
				UserData user = UserData.builder()
					.email(userDTO.getEmail())
					.password(hashPassword(userDTO.getPassword()))
					.build();
				userRepository.save(user);
				return new ResponseEntity<>("user was created", HttpStatus.CREATED);
			}
			return new ResponseEntity<>("An account with this Email is already created", HttpStatus.NOT_ACCEPTABLE);
		}
		catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/*
	 * New method to verify credentials for login then check if the email is in the
	 * database then verify the password
	 */
	public ResponseEntity<?> login(String userEmail, String userPassword) {
		userPassword = hashPassword(userPassword);
		UserData userDocument = userRepository.findByEmail(userEmail);
		if (userDocument != null) {
			if (userPassword.equals(hashPassword(userDocument.getPassword()))) {
				return new ResponseEntity<>(HttpStatus.OK);
			}
			return new ResponseEntity<>("Incorrect Password", HttpStatus.NOT_FOUND);

		}
		return new ResponseEntity<>("Incorrect Credentials", HttpStatus.NOT_FOUND);
	}

}