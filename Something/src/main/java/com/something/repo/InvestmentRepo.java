package com.something.repo;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.something.domain.Investment;

public interface InvestmentRepo extends JpaRepository<Investment, BigInteger> {
	@Query(value = "SELECT * FROM investment where code=?1", nativeQuery = true)
    Investment findByCode(String code);
	
	@Query(value = "SELECT * FROM investment where username=?1", nativeQuery = true)
    List<Investment> findByUsername(String username);
}
