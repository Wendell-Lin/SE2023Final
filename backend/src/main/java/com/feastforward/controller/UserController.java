package com.feastforward.controller;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.feastforward.model.Item;
import com.feastforward.model.PasswordResetToken;
import com.feastforward.model.User;
import com.feastforward.model.dto.ItemDto;
import com.feastforward.model.dto.Mapper;
import com.feastforward.model.dto.PasswordDto;
import com.feastforward.model.dto.UserProfileDto;
import com.feastforward.payload.request.UpdateUserFollowItemRequest;
import com.feastforward.payload.request.UpdateUserProfileRequest;
import com.feastforward.payload.response.GenericResponse;
import com.feastforward.payload.response.ItemsResponse;
import com.feastforward.repository.ItemRepository;
import com.feastforward.repository.PasswordResetTokenRepository;
import com.feastforward.repository.UserRepository;
import com.feastforward.service.FollowService;
import com.feastforward.service.ItemService;
import com.feastforward.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private MessageSource messages;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    UserService userService;

    @Autowired
    FollowService followService;

    @Autowired
    Mapper mapper;

    // ============  Handling Forgot Password Feature  ============

    // Construct url for resetting password sent in email
    private String getAppUrl(HttpServletRequest request) {
        return request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }

    // Reset password with a link (for forgot password feature)
    @PostMapping("/resetPasswordWithLink")
    public ResponseEntity<?> resetPasswordWithLink(HttpServletRequest request, @RequestParam("email") String userEmail) {

        // Get user by email
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (!userOptional.isPresent()) {
            throw new IllegalArgumentException("User cannot be not found by this email");
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
            throw new InternalError("Unable to send email");
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
    @PostMapping("/resetPwdWithNewPwd")
    public ResponseEntity<?> resetPasswordWithNewPassword(@RequestParam("email") String userEmail) {
        // Get user by email
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (!userOptional.isPresent()) {
            throw new IllegalArgumentException("User cannot be not found by this email");
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
            throw new InternalError("Unable to send email");
        }

        return ResponseEntity.ok(new GenericResponse("Email sent!"));
    }

    // Change password
    @PostMapping("/updatePassword")
    public ResponseEntity<?> updatePassword(Locale locale, @Valid @RequestParam("oldPassword") String oldPassword, @RequestParam("newPassword") String newPassword) {
        User user = userService.getCurrentUser();
        if (!userService.checkIfValidOldPassword(user, oldPassword)) {
            throw new IllegalArgumentException("Invalid old password");
        }
        userService.changeUserPassword(user, newPassword);
        return ResponseEntity.ok(new GenericResponse(messages.getMessage("message.updatePasswordSuc", null, locale)));
    }

    // user profile

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDto> getUserProfile() {
        User user = userService.getCurrentUser();
        return ResponseEntity.ok(mapper.mapUserToUserProfileDto(user));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserProfileDto> updateUserProfile(
        @RequestBody UpdateUserProfileRequest updateUserProfileRequest
    ) {
        User updatedUser = userService.updateUserProfile(updateUserProfileRequest);
        if (updatedUser != null) {
            return ResponseEntity.ok(
                mapper.mapUserToUserProfileDto(updatedUser)
            );
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    // user follow items
    @GetMapping("follow-item")
    public ResponseEntity<ItemsResponse> getUserFollowItem() 
    {
        User user = userService.getCurrentUser();
        List<ItemDto> itemDtos = user
                .getFollowedItems()
                .stream()
                .map(mapper::mapItemToItemDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ItemsResponse(itemDtos, "success"));
    }

    @PutMapping("follow-item")
    public ResponseEntity<ItemsResponse> updateUserFollowItem(
        @RequestBody UpdateUserFollowItemRequest request
    ) {
        // blank response component
        List<ItemDto> itemDtos = new ArrayList<>();
        String message = "success";
        // user and items
        Long userId = userService.getCurrentUser().getId();
        Long itemId = request.getItemId();
        Boolean follow = request.getFollow();
        try{
            if (follow == true){
                followService.followItem(userId, itemId);
            } else {
                followService.unfollowItem(userId, itemId);
            }
        } catch(Exception e){
            message = e.getMessage();
            return ResponseEntity.badRequest().body(
                new ItemsResponse(itemDtos, message));
        }
        // item dto list, response
        itemDtos = userService.getCurrentUser().getFollowedItems().stream().map(mapper::mapItemToItemDto).toList();
        return ResponseEntity.ok(new ItemsResponse(itemDtos, message));
    }

    @GetMapping("upload-item")
    public ResponseEntity<ItemsResponse> getCreatedItem(){
        User user = userService.getCurrentUser();
        List<ItemDto> itemDtos = user.getCreatedItems().stream().map(mapper::mapItemToItemDto).toList();
        return ResponseEntity.ok(new ItemsResponse(itemDtos, "success"));
    }
}
