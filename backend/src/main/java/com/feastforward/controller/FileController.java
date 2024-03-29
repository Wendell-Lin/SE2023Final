package com.feastforward.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.feastforward.service.FileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;


import java.io.IOException;



@RestController
@RequestMapping("/api/file")
public class FileController {
    
    @Autowired
    private FileService fileService;

    @GetMapping("/list")
    public ResponseEntity<List<String>> listOfFiles() {
        List<String> files = fileService.listOfFiles();
        return ResponseEntity.ok(files);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestBody String base64String) throws IOException {
        fileService.uploadFile(base64String, "test");
        return ResponseEntity.ok("File uploaded successfully");
    }

    @GetMapping("/download/{filename}")
    public ResponseEntity<String> downloadFile(@PathVariable String filename) {
        String base64String = fileService.getFile(filename);
        return ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(base64String);
    }

    @DeleteMapping("/delete/{filename}")
    public ResponseEntity<String> deleteFile(@PathVariable String filename) {
        fileService.deleteFile(filename);
        return ResponseEntity.ok("File deleted successfully");
    }
}
