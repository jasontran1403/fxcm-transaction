package com.something.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.something.domain.Comparison;

public interface ComparisonRepo extends JpaRepository<Comparison, Long>{
	@Query(value = "SELECT * FROM comparison WHERE appraisal_id = ?1", nativeQuery = true)
	List<Comparison> findByAppraisalId(long id);
}
