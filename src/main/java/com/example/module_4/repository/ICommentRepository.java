package com.example.module_4.repository;

import com.example.module_4.model.Comment;
import com.example.module_4.model.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICommentRepository extends JpaRepository<Comment, Long> {
    void deleteAllByHouse(House house);
}
