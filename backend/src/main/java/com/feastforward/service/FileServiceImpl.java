package com.feastforward.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.gax.paging.Page;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;



@Service
public class FileServiceImpl implements FileService {
    
    @Value("${gcp.bucket.name}")
    private String bucketName;

    @Autowired
    private Storage storage;

    @Override
    public List<String> listOfFiles() {
        List<String> list = new ArrayList<>();
        Page<Blob> blobs = storage.list(bucketName);
        for (Blob blob : blobs.iterateAll()) {
            list.add(blob.getName());
        }
        return list;
    }

    @Override
    public String getFile(String filename) {
        Blob blob = storage.get(BlobId.of(bucketName, filename));
        if (blob == null) {
            return null;
        }
        byte[] content = blob.getContent();
        String base64String = new String(content);
        return base64String;
    }

    @Override
    public boolean deleteFile(String filename) {
        BlobId blobId = BlobId.of(bucketName, filename);
        boolean deleted = storage.delete(blobId);
        return deleted;
    }

    @Override
    public void uploadFile(String base64String, String fileName) throws IOException {
        BlobId blobId = BlobId.of(bucketName, fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("text/plain").build();
        Blob blob = storage.create(blobInfo, base64String.getBytes());
    }
}
