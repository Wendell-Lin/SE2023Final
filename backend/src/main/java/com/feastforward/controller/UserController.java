package com.feastforward.controller;

import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.feastforward.model.PasswordResetToken;
import com.feastforward.model.User;
import com.feastforward.model.dto.PasswordDto;
import com.feastforward.payload.response.GenericResponse;
import com.feastforward.repository.PasswordResetTokenRepository;
import com.feastforward.repository.UserRepository;
import com.feastforward.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private MessageSource messages;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    UserService userService;

    // ============  Handling Forgot Password Feature  ============

    // Construct url for resetting password sent in email
    private String getAppUrl(HttpServletRequest request) {
        return request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }

    // Reset password with a link (for forgot password feature)
    @PostMapping("/resetPasswordWithLink")
    public ResponseEntity<?> resetPassword(HttpServletRequest request, @RequestParam("email") String userEmail) {

        // Get user by email
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (!userOptional.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new GenericResponse("Error: User cannot be not found by this email!"));
        }
        User user = userOptional.get();

        // Check if token exists; if yes, delete it
        PasswordResetToken existingToken = passwordResetTokenRepository.findByUser(user);
        if (existingToken != null) {
            passwordResetTokenRepository.delete(existingToken);
        }

        // Create new token and send email
        String token = UUID.randomUUID().toString();
        userService.createPasswordResetTokenForUser(user, token);
        try {
            mailSender.send(userService.constructResetTokenEmail(getAppUrl(request), request.getLocale(), token, user));
        } catch (MailException e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new GenericResponse("Error: Unable to send email!"));
        }

        return ResponseEntity.ok(new GenericResponse("Email sent!"));
    }

    // Change password (for forgot password feature)
    @GetMapping("/changePassword")
    public String showChangePasswordPage(Locale locale, Model model, @RequestParam("token") String token) {
        String result = userService.validatePasswordResetToken(token);
        if (result != null) {
            String message = messages.getMessage("auth.message." + result, null, locale);
            return "redirect:/login.html?lang=" + locale.getLanguage() + "&message=" + message;
        } else {
            model.addAttribute("token", token);
            return "redirect:/updatePassword.html?lang=" + locale.getLanguage();
        }
    }

    // Save password (for forgot password feature)
    @PostMapping("/savePassword")
    public GenericResponse savePassword(final Locale locale, @Valid PasswordDto passwordDto) {

        String result = userService.validatePasswordResetToken(passwordDto.getToken());

        if (result != null) {
            return new GenericResponse(messages.getMessage("auth.message." + result, null, locale));
        }

        Optional<User> userOptional = userService.getUserByPasswordResetToken(passwordDto.getToken());
        if (userOptional.isPresent()) {
            userService.changeUserPassword(userOptional.get(), passwordDto.getNewPassword());
            return new GenericResponse(messages.getMessage("message.resetPasswordSuc", null, locale));
        } else {
            return new GenericResponse(messages.getMessage("auth.message.invalid", null, locale));
        }
    }

    // ============ Handling Update Password Feature ============

    // Reset password with old password
    @PostMapping("/resetPasswordWithOld")
    public ResponseEntity<?> resetPassword(@RequestParam("email") String userEmail) {
        // Get user by email
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (!userOptional.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new GenericResponse("Error: User cannot be not found by this email!"));
        }
        User user = userOptional.get();

        // Change the user's password
        userService.changeUserPassword(user, "Simple/123");

        // Send new password to the user's email
        try {
            mailSender.send(userService.constructEmail("Reset Password", "Your new password is: " + 
                "Simple/123" + "\nPlease update the password on the login page.\n\nFeastForward Team", user));
        } catch (MailException e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new GenericResponse("Error: Unable to send email!"));
        }

        return ResponseEntity.ok(new GenericResponse("Email sent!"));
    }

    // Change password
    @PostMapping("/updatePassword")
    public ResponseEntity<?> updatePassword(Locale locale, @Valid @RequestParam("oldPassword") String oldPassword, @RequestParam("newPassword") String newPassword) {
        User user = userService.getCurrentUser();
        if (!userService.checkIfValidOldPassword(user, oldPassword)) {
            return ResponseEntity
                    .badRequest()
                    .body(new GenericResponse("Error: Old password is incorrect!"));
        }
        userService.changeUserPassword(user, newPassword);
        return ResponseEntity.ok(new GenericResponse(messages.getMessage("message.updatePasswordSuc", null, locale)));
    }

    // ============
}
