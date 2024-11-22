package com.daniellaera.spring_boot_vuejs.service;

import com.daniellaera.spring_boot_vuejs.dto.PostDTO;

import java.util.List;
import java.util.Optional;

public interface PostService {

    List<PostDTO> getAllPosts();

    Optional<PostDTO> getPostById(Long id);

    PostDTO createPost(PostDTO postDTO);

    void deleteById(Long id);

    PostDTO updatePost(Long postId, PostDTO postDto);
}
