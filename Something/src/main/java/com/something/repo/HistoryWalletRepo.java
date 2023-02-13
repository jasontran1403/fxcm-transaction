package com.something.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.something.domain.HistoryWallet;

public interface HistoryWalletRepo extends JpaRepository<HistoryWallet, Integer>{
	@Query(value = "SELECT * FROM history_wallet WHERE id = ?1", nativeQuery = true)
	HistoryWallet findByWalletId(int id);
	
	@Query(value = "SELECT * FROM history_wallet WHERE username = ?1", nativeQuery = true)
	List<HistoryWallet> findByUsername(String username);
}
