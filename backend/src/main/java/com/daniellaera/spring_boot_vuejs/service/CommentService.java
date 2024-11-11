package com.daniellaera.spring_boot_vuejs.service;

import com.daniellaera.spring_boot_vuejs.dto.CommentDTO;

import java.util.List;

public interface CommentService {

    CommentDTO addComment(Long postId, CommentDTO commentDTO);

    List<CommentDTO> getAllCommentsByPostId(Long postId);

    CommentDTO updateComment(Long commentId, CommentDTO commentDTO);
}
