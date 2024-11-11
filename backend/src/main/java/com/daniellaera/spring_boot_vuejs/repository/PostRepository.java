package com.daniellaera.spring_boot_vuejs.repository;

import com.daniellaera.spring_boot_vuejs.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
