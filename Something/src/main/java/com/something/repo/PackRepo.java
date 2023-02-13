package com.something.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.something.domain.Pack;

public interface PackRepo extends JpaRepository<Pack, Integer> {

}
