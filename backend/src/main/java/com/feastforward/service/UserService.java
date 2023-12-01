package com.feastforward.service;

import java.time.Instant;
import java.util.Calendar;
import java.util.Locale;
import java.util.Optional;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;

import com.feastforward.model.Item;
import com.feastforward.model.PasswordResetToken;
import com.feastforward.model.User;
import com.feastforward.payload.request.UpdateUserFollowItemRequest;
import com.feastforward.payload.request.UpdateUserProfileRequest;
import com.feastforward.repository.ItemRepository;
import com.feastforward.repository.PasswordResetTokenRepository;
import com.feastforward.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private MessageSource messages;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private PasswordResetTokenRepository passwordTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Value("${spring.mail.username}")
    private String supportEmail;

    @Autowired
    FileService fileService;

    // ============  Handling password reset & construct mail message  ============
    public void createPasswordResetTokenForUser(User user, String token) {
        PasswordResetToken myToken = new PasswordResetToken(token, user);
        passwordTokenRepository.save(myToken);
    }

    public SimpleMailMessage constructResetTokenEmail(String contextPath, Locale locale, String token, User user) {
        String url = contextPath + "/user/changePassword?token=" + token;
        String message = messages.getMessage("message.resetPassword", null, locale);
        return constructEmail("Reset Password", message + " \r\n" + url, user);
    }

    public SimpleMailMessage constructEmail(String subject, String body, User user) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setSubject(subject);
        email.setText(body);
        email.setTo(user.getEmail());
        email.setFrom(supportEmail);
        return email;
    }
    
    // ============  Handling password reset token validation & change password ============
    public String validatePasswordResetToken(String token) {
        final PasswordResetToken passToken = passwordTokenRepository.findByToken(token);

        return !isTokenFound(passToken) ? "invalidToken"
                : isTokenExpired(passToken) ? "expired"
                : null;
    }

    private boolean isTokenFound(PasswordResetToken passToken) {
        return passToken != null;
    }

    private boolean isTokenExpired(PasswordResetToken passToken) {
        final Calendar cal = Calendar.getInstance();
        return passToken.getExpiryDate().before(cal.getTime());
    }

    public Optional<User> getUserByPasswordResetToken(final String token) {
        return Optional.ofNullable(passwordTokenRepository.findByToken(token) .getUser());
    }

    public void changeUserPassword(User user, String password) {
        user.setPassword(encoder.encode(password));
        userRepository.save(user);
    }
    
    public boolean checkIfValidOldPassword(final User user, final String oldPassword) {
        return encoder.matches(oldPassword, user.getPassword());
    }

    public PasswordResetToken getPasswordResetToken(final String token) {
        return passwordTokenRepository.findByToken(token);
    }

    // ============ User Services ============

    // Get current user
    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            String username = ((UserDetails)principal).getUsername();
            return userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        } else {
            throw new BadCredentialsException("User is not authenticated");
        }
    }

    public User updateUserProfile(UpdateUserProfileRequest request) {
        User user = getCurrentUser();
        // handle image
        // save new image to GCP
        String newImageName = null;
        String base64String = request.getImage();
        if (base64String != null){
            newImageName = Instant.now().getEpochSecond() + RandomStringUtils.randomAlphanumeric(10);
            try {
                fileService.uploadFile(base64String, newImageName);
            } catch (Exception e) {
                throw new RuntimeException("Error: Image upload failed.");
            }
        }
        // remove old image from GCP
        String oldImageName = user.getImageName();
        if (oldImageName != null){
            try {
                fileService.deleteFile(oldImageName);
            } catch (Exception e) {
                throw new RuntimeException("Error: Image deletion failed.");
            }
        }
        // update user
        user.setImageName(newImageName);
        user.setUsername(request.getUsername());
        user.setNotifOn(request.getNotifOn());
        return userRepository.save(user);
    }
}
