package com.feastforward.service;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileService {
    List<String> listOfFiles();
    // ByteArrayResource getFile(String filename);
    String getFile(String filename);
    boolean deleteFile(String filename);
    // void uploadFile(MultipartFile file) throws IOException;
    void uploadFile(String base64String, String fileName) throws IOException;
}
