package com.daniellaera.spring_boot_vuejs.service;

import com.daniellaera.spring_boot_vuejs.dto.PostDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface PostService {

    List<PostDTO> getAllPosts();

    Optional<PostDTO> getPostById(Long id);

    PostDTO createPost(PostDTO postDTO);

    void deleteById(Long id);
}
